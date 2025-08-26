// firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // si quieres Firestore
import { getAuth } from "firebase/auth"; // si quieres Auth

const firebaseConfig = {
  apiKey: "AIzaSyDWYQzRx2eW0VfOIRQk1T44X7DpoN7VfDY",
  authDomain: "abarrotesjuliancito.firebaseapp.com",
  projectId: "abarrotesjuliancito",
  storageBucket: "abarrotesjuliancito.firebasestorage.app",
  messagingSenderId: "203627016114",
  appId: "1:203627016114:web:7e4e11f2dc0cfb4959feab",
  measurementId: "G-RGRRQVCTEC",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa servicios que necesites
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };
