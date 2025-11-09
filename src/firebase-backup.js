import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // ✅ FIXED IMPORT
import { getStorage } from "firebase/storage";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCTb_J7c8N3q7wL5367dOqG2VuNh7knf1E",
  authDomain: "my-portfolio-app-99ebf.firebaseapp.com",
  projectId: "my-portfolio-app-99ebf",
  storageBucket: "my-portfolio-app-99ebf.appspot.com", // ✅ FIXED
  messagingSenderId: "418631000065",
  appId: "1:418631000065:web:26e885cbce3cd249616000",
  measurementId: "G-D4LGV2TRP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Ensure these are actually imported before exporting
export { db, storage, collection, addDoc };

