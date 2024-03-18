import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import FIREBASE_CONFIG from './config';

const app = initializeApp(FIREBASE_CONFIG);

export const database = getFirestore(app);

const auth = getAuth(app);

export const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const createUser = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const logout = () => {
  signOut(auth);
};
