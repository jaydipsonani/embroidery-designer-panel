import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCYxLhsK8blkyP7Wz3eXLd8QFY1uIy9CXI",
    authDomain: "embromart-designers.firebaseapp.com",
    projectId: "embromart-designers",
    storageBucket: "embromart-designers.firebasestorage.app",
    messagingSenderId: "962797717227",
    appId: "1:962797717227:web:d9338d0e58d56dea2f20ae",
    measurementId: "G-MNEZ26KD9P"
}

// Initialize Firebase (check if already initialized for Next.js)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
