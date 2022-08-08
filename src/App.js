// import { useState } from 'react';
import './App.module.css';
import PreviewVideos from './components/PreviewVideos/PreviewVideos';
import UploadForm from './components/UploadForm/UploadForm';

function App() {

  // const [uploadedVideos, setUploadedVideos] = useState([]);
  return (
    <>
      <UploadForm />
      <PreviewVideos />
    </>

    );
}

export default App;
