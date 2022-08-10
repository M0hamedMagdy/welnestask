const functions = require('firebase-functions');
const admin = require('firebase-admin');
const path = require('path');
const os = require('os');
const fs = require('fs');
const spawn = require('child-process-promise').spawn;

admin.initializeApp();

exports.createVideoThumb = functions.storage.object().onFinalize(async object => {
   console.log(object);
   functions.logger.log(object)

    const fileBucket = object.bucket;
    const filePath = object.name;
    const contentType = object.contentType;
    const dir = path.dirname(filePath);
    const fileName = path.basename(filePath).trim();

    functions.logger.log(fileName);
  
    functions.logger.log(fileBucket, filePath, contentType, dir, fileName)

    const bucket = admin.storage().bucket(fileBucket);
    const tempFilePath = path.join(os.tmpdir(), fileName);
    const metadata = {
      contentType: 'image/png',
    };

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
      '265X150',
      '-ss',
      '30',
      locatThmbFilePath,
    ]);
    functions.logger.log('Thumbnail has been created');

    await bucket.upload(locatThmbFilePath, {
      destination: remoteThmbFilePath,
      metadata: metadata,
      public: true,
    });

    functions.logger.log('Thumbmain uploaded to the bucket');

    await fs.unlinkSync(locatThmbFilePath);
    return fs.unlinkSync(tempFilePath);

  });
