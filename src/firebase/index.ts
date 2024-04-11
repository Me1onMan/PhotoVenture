import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';

import FIREBASE_CONFIG from './config';

const app = initializeApp(FIREBASE_CONFIG);

export const database = getFirestore(app);
export const storage = getStorage(app, 'gs://photoventure-2d4dc.appspot.com');
export const storageImagesRef = ref(storage, 'images');

export const auth = getAuth(app);

export const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const createUser = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const logout = async () => {
  await signOut(auth);
};
