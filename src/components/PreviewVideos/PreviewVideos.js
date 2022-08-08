import React from 'react'


 function PreviewVideos({videoUrls}) {
  return (
    <section className='video-container'>
      {videoUrls.map((url) => 
        <video key={url} controls> 
            <source src={url} type='video/mp4' />
            <p>Your browser doesn't support HTML5 video. Here is a
            <a href={url}>link to the video</a> instead.</p>
        </video>
      )}
    </section>
  )
}



export default PreviewVideos