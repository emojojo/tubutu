import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDEghV_DgrSZylbBWH3D3wJ03po_zSLanE",
  authDomain: "tubutu-farm.firebaseapp.com",
  projectId: "tubutu-farm",
  storageBucket: "tubutu-farm.firebasestorage.app",
  messagingSenderId: "344371112619",
  appId: "1:344371112619:web:920ddbd1fb0be5581b65ee",
  measurementId: "G-T22Z1Y91LK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider, signInWithPopup, signOut, onAuthStateChanged, doc, setDoc, getDoc, onSnapshot, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile };
