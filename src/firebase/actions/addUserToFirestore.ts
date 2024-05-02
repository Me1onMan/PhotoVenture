import { addDoc, collection } from 'firebase/firestore';

import { TUserRegistraton } from '@/types';

import { USERS_COLLECTION } from '../collections';
import { database } from '..';

const addUserToFirestore = async ({
  login,
  email,
  telegramLink,
}: Omit<TUserRegistraton, 'password' | 'photoLink'>) => {
  try {
    const createdUser = await addDoc(collection(database, USERS_COLLECTION), {
      login,
      email,
      telegramLink,
    });
    return { login, email, telegramLink, id: createdUser.id };
  } catch (error) {
    console.log(error);
    throw new Error('Error occured in addUserToFirestore()');
  }
};

export default addUserToFirestore;
