import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbCDqnWdCc-lCtnyoOhGiEXvvbSDKvnW4",
  authDomain: "iot-sample-358611.firebaseapp.com",
  projectId: "iot-sample-358611",
  storageBucket: "iot-sample-358611.appspot.com",
  messagingSenderId: "397387907263",
  appId: "1:397387907263:web:3d61b7da2908d2f1f8c60a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);