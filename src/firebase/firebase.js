// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// import getAuth from "firebase/auth"
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAx8kBZHdygcg--vMdaHhpavowaeEzVXWA',
  authDomain: 'blogify-e31da.firebaseapp.com',
  projectId: 'blogify-e31da',
  storageBucket: 'blogify-e31da.firebasestorage.app',
  messagingSenderId: '964750433189',
  appId: '1:964750433189:web:989b43dc460170639aa64c',
  measurementId: 'G-ZEP9TYY03F',
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app)
export const db = getFirestore(app);
