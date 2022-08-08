import React from 'react'



 function UploadForm({handleUpload , handleUploadedVids}) {
  return (
    <section>
      <form>
          <label htmlFor="files">
              <span>Select Video:</span>
              <input type="file" name="files" id="files" onChange={handleUploadedVids} />
          </label>
          <button type="submit" onClick={handleUpload}>Upload</button>
      </form>
    </section>
  )
}


export default UploadForm

