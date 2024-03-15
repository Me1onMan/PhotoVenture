import { addDoc, collection } from 'firebase/firestore';

import { TUser } from '@/types';

import { USERS_COLLECTION } from '../collections';
import { database } from '..';

type TUserDB = Pick<TUser, 'login' | 'email' | 'telegramLink'>;

const addUserToFirestore = async ({ login, email, telegramLink }: TUserDB) => {
  try {
    addDoc(collection(database, USERS_COLLECTION), {
      login,
      email,
      telegramLink,
    });
  } catch (error) {
    console.log(error);
    throw new Error('Error occured in addUserToFirestore()');
  }
};

export default addUserToFirestore;
