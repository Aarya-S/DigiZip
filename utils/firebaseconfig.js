// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-N5JAHDRAX9DHpPhSzL_hRmZwT3Lr8ww",
  authDomain: "digizip-3eafe.firebaseapp.com",
  projectId: "digizip-3eafe",
  storageBucket: "digizip-3eafe.appspot.com",
  messagingSenderId: "377607837553",
  appId: "1:377607837553:web:550f288928bcb7232d48d0",
  measurementId: "G-S48M70D6E8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export{
  app,
  analytics,
  firebaseConfig
}