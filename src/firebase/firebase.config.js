// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAtWLUmW5Lpe16nVEVJgqUVg9z9KCFZTds",
    authDomain: "ema-john-firbase-auth.firebaseapp.com",
    projectId: "ema-john-firbase-auth",
    storageBucket: "ema-john-firbase-auth.appspot.com",
    messagingSenderId: "1080467069850",
    appId: "1:1080467069850:web:745b9f78d151f16598b823"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
