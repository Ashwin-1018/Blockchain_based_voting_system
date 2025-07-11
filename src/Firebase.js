// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_3bsog_hFrhHAlBV4PVdJEdyD_AgWQrM",
  authDomain: "voting-c55f0.firebaseapp.com",
  projectId: "voting-c55f0",
  storageBucket: "voting-c55f0.firebasestorage.app",
  messagingSenderId: "291971498203",
  appId: "1:291971498203:web:9e57337f3c71fbd40cccfe",
  measurementId: "G-DM1N3RF4M7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export {db,auth};