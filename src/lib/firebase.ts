
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDclW7wCunwhSSsjvw6Lu1SOR2Ie_B97GU",
  authDomain: "shadowsight-f9260.firebaseapp.com",
  projectId: "shadowsight-f9260",
  storageBucket: "shadowsight-f9260.firebasestorage.app",
  messagingSenderId: "3083914509",
  appId: "1:3083914509:web:36bd8558bcf69555987444",
  measurementId: "G-1E4W6RK8Z6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, analytics };
