import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "./firebase";
import {v4} from 'uuid';


import PreviewVideos from './components/PreviewVideos/PreviewVideos';
import UploadForm from './components/UploadForm/UploadForm';

function App() {
  // The State Of the uploaded Video
 const [uploadedVideos, setUploadedVideos] = useState(null);
  // The State of Videos list
 const [videoUrls, setVideoUrls] = useState([]);


  const videosListRef = ref(storage, 'videos/')

  function handleUploadedVids(e) {
    setUploadedVideos(e.target.files[0])
  }
  
  function handleUpload(e) { 
    e.preventDefault();
    if(uploadedVideos == null) return;
    const videoRef = ref(storage, `videos\${uploadedVideos.name + v4()}`);
    uploadBytes(videoRef, uploadedVideos).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) =>  {
         alert('Video Uploaded');
         setVideoUrls((prev) => [...prev, url]);
      })
    })
  }

  useEffect(() => {
    listAll(videosListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setVideoUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);



  
  return (
    <>
      <UploadForm handleUpload={handleUpload} handleUploadedVids={handleUploadedVids} />
      <PreviewVideos videoUrls={videoUrls} />
    </>

    );
}
  
export default App;
