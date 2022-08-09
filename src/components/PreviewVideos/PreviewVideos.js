import React from 'react'


 function PreviewVideos({videoUrls, thumbUrls}) {
  
  return (
    <section className='video-container'>
      {videoUrls.map((url) => {
        let fileName = url;
        let urlName = String(fileName.substr(85, 45))      
        let postername = thumbUrls.filter((url) => {
          if(url.includes(urlName)) {
            return url;
          }
        }) 
        return(
          <video key={url} controls poster={postername}> 
              <source src={fileName} type='video/mp4'/>
              <p>Your browser doesn't support HTML5 video. Here is a
              <a href={url}>link to the video</a> instead.</p>
          </video>

        )
      } 
      )}
    </section>
  )
}



export default PreviewVideos