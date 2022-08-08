import React from 'react'


 function PreviewVideos({videoUrls}) {
  return (
    <section className='video-container'>
      {videoUrls.map((url) => <video src={url}></video>)}
    </section>
  )
}



export default PreviewVideos