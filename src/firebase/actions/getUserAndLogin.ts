import { collection, getDocs, query, where } from 'firebase/firestore';

import { TUserWOPassword } from '@/types';

import { USERS_COLLECTION } from '../collections';
import { database, signIn } from '..';

const LOGIN = 'login';
// const EMAIL = 'email';

const getUserAndLogin = async (login: string, password: string) => {
  const userCollection = collection(database, USERS_COLLECTION);
  const userQuery = query(userCollection, where(LOGIN, '==', login));

  const querySnapshot = await getDocs(userQuery);

  if (querySnapshot.empty) return null;

  const userData = querySnapshot.docs[0].data();
  const userEmail = userData.email;
  const userId = querySnapshot.docs[0].id;

  await signIn(userEmail, password);

  const user: TUserWOPassword = {
    id: userId,
    login: userData.login,
    email: userEmail,
    telegramLink: userData.telegramLink,
  };

  return user;
};

export default getUserAndLogin;
