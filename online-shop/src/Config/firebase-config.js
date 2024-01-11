// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
//import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getStorage } from '@firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCPovvnacGL96XeFJ41FWtGQAjnANFdxbo',
  authDomain: 'bnm---shop.firebaseapp.com',
  projectId: 'bnm---shop',
  storageBucket: 'bnm---shop.appspot.com',
  messagingSenderId: '1013956945813',
  appId: '1:1013956945813:web:0a4ac7453f7eab6a2eb89c',
  measurementId: 'G-Z43PLSP7KF',
  databaseURL:
    'https://bnm---shop-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
//const analytics = getAnalytics(app);
