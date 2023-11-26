// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "safe-stay-96636.firebaseapp.com",
  projectId: "safe-stay-96636",
  storageBucket: "safe-stay-96636.appspot.com",
  messagingSenderId: "485477138258",
  appId: "1:485477138258:web:90bad4a06057d90a9b848b",
  measurementId: "G-FYPXPBR46H",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
