// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // <-- Auth qo‘shildi

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUv_PmD1dw6jNJwRscqyFtiya9NzPB-UI",
  authDomain: "b-chat-2d7d9.firebaseapp.com",
  projectId: "b-chat-2d7d9",
  storageBucket: "b-chat-2d7d9.appspot.com",
  messagingSenderId: "819713953146",
  appId: "1:819713953146:web:37f3de7c0053400c041ac3",
  measurementId: "G-0QWW8H81ZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app); // <-- Auth initialize qilindi

// Export for usage in other files
export { app, db, auth };
