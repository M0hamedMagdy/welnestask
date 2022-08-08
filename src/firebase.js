import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQwgsg0iNOPfX0bJBVg2IoU_4IL1W4gY0",
  authDomain: "welnestask1.firebaseapp.com",
  projectId: "welnestask1",
  storageBucket: "welnestask1.appspot.com",
  messagingSenderId: "328367299048",
  appId: "1:328367299048:web:c59a181289667c60802c5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);