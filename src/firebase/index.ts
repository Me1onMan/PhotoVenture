// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB1Iy8TVa05M3VKBK1ZvqN-l7lT0sG7ZvA',
  authDomain: 'photoventure-2d4dc.firebaseapp.com',
  projectId: 'photoventure-2d4dc',
  storageBucket: 'photoventure-2d4dc.appspot.com',
  messagingSenderId: '914837165722',
  appId: '1:914837165722:web:f48a755fb74e77c6abf123',
  measurementId: 'G-QMGGRK2F90',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);
const auth = getAuth(app);

export const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const createUser = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);
