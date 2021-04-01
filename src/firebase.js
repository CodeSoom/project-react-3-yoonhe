import firebase from 'firebase/app';
import 'firebase/auth';

import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

console.log('process.env.API_KEY ? ', process.env.TEST);

export const firebaseInstance = firebase.initializeApp(firebaseConfig);
export const dbService = firebase.firestore();
export const authService = firebase.auth();
