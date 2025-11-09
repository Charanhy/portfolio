import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // ✅ FIXED IMPORT
import { getStorage } from "firebase/storage";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBdEI-SuRGHu7IycLzQ_TKQsthVOjuV6TY",
  authDomain: "my-portfolio-d797a.firebaseapp.com",
  projectId: "my-portfolio-d797a",
  storageBucket: "my-portfolio-d797a.firebasestorage.app",
  messagingSenderId: "114636139745",
  appId: "1:114636139745:web:73ef6f4d6182130da05ba0",
  measurementId: "G-LPSSTMV5XE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Ensure these are actually imported before exporting
export { db, storage, collection, addDoc };

