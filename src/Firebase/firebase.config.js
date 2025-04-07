// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJoa_Xf0y2XAgl0LuJ4UFhUeUNqFWLRu4",
  authDomain: "job-portal-27035.firebaseapp.com",
  projectId: "job-portal-27035",
  storageBucket: "job-portal-27035.firebasestorage.app",
  messagingSenderId: "942277793154",
  appId: "1:942277793154:web:78a5f103d7e015c2fb6b9b",
  measurementId: "G-F6TQKTEPVQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;