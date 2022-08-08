import React from 'react'



 function UploadForm() {
  return (
    <section>
      <form>
          <label htmlFor="files">
              <span>Select Video:</span>
              <input type="file" name="files" id="files" />
          </label>
          <button type="submit">Upload</button>
      </form>
    </section>
  )
}


export default UploadForm

