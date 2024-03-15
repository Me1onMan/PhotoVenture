import { collection, getDocs, query, where } from 'firebase/firestore';

import { TUser } from '@/types';

import { USERS_COLLECTION } from '../collections';
import { database, signIn } from '..';

type TUserWOPassword = Omit<TUser, 'password'>;

const LOGIN = 'login';
// const EMAIL = 'email';

const getUserIdAndLogin = async (login: string, password: string) => {
  const userCollection = collection(database, USERS_COLLECTION);
  const userQuery = query(userCollection, where(LOGIN, '==', login));

  const querySnapshot = await getDocs(userQuery);

  if (querySnapshot.empty) return null;

  const userData = querySnapshot.docs[0].data();
  const userEmail = userData.email;

  const userCredentials = await signIn(userEmail, password);
  const user: TUserWOPassword = {
    id: userCredentials.user.uid,
    token: await userCredentials.user.getIdToken(),
    login: userData.login,
    email: userEmail,
    telegramLink: userData.telegramLink,
  };

  return user;
};

export default getUserIdAndLogin;
