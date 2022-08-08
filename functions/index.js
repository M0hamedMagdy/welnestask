const functions = require('firebase-functions');
const admin = require('firebase-admin');
const path = require('path');
const os = require('os');
const fs = require('fs');
const spawn = require('child-process-promise').spawn;



// initialise firebase admin
admin.initializeApp();

exports.createVideoThumb = functions.storage.object()
  .onFinalize(async object => {
    const fileBucket = object.bucket;
    const filePath = object.name;
    const contentType = object.contentType;
    const dir = path.dirname(filePath);
    const fileName = path.basename(filePath);

    functions.logger.log(fileBucket, filePath, contentType, dir, fileName);

    if (!contentType.startsWith('video/')) return console.log('Not an video');

     if (!dir === 'videos/')
       return console.log('Not the intended directory');

    if (fileName.startsWith('thumb_')) {
      return console.log('Video is already a thumbnail');
    }

    // continue execution

    // download file to memory
    const bucket = admin.storage().bucket(fileBucket);
    const tempFilePath = path.join(os.tmpdir(), fileName);
    const metadata = {
      contentType: 'image/png',
    };

    // download the file from bucket to tmp disk
    try {
      const upRes = await bucket
        .file(filePath)
        .download({destination: tempFilePath});
      console.log('UP_RES', JSON.stringify(upRes));
      functions.logger.log('video has been downloaded to :', tempFilePath);
    } catch (error) {
      console.log('err at download bucket', error);
    }

    const thmbFileName = `thumb_${fileName}.png`;
    const locatThmbFilePath = path.join(os.tmpdir(), thmbFileName);
    const remoteThmbFilePath = path.join(dir, thmbFileName);

    await spawn('ffmpeg', [
      '-i',
      tempFilePath,
      '-vframes',
      '1',
      '-an',
      '-s',
      '260X150',
      '-ss',
      '1',
      locatThmbFilePath,
    ]);
    functions.logger.log('Thumbnail has been created');

    await bucket.upload(locatThmbFilePath, {
      destination: remoteThmbFilePath,
      metadata: metadata,
      public: true,
    });

    functions.logger.log('Thumbmain uploaded to the bucket');

    // return 'Task done';
    await fs.unlinkSync(locatThmbFilePath);
    return fs.unlinkSync(tempFilePath);
  });
