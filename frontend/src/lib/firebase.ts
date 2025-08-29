// // lib/firebase.ts
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyCGFydi37Ql6QT4ajVELgn64O-xFzEpfx4",
//   authDomain: "auth-47ad1.firebaseapp.com",
//   projectId: "auth-47ad1",
//   storageBucket: "auth-47ad1.appspot.com",
//   messagingSenderId: "907900774236",
//   appId: "1:907900774236:web:YOUR_WEB_APP_ID", // from Firebase settings
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const googleProvider = new GoogleAuthProvider();


// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCGFydi37Ql6QT4ajVELgn64O-xFzEpfx4",
  authDomain: "auth-47ad1.firebaseapp.com",
  projectId: "auth-47ad1",
  storageBucket: "auth-47ad1.appspot.com",
  messagingSenderId: "907900774236",
  appId: "1:907900774236:web:your-web-app-id" // Replace with your actual web app ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Configure Google Provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;