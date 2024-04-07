import { AppDispatch } from '@/store';
import { setActiveUser } from '@/store/slices/activeUserSlice';
import { TUser } from '@/types';

import { createUser } from '..';

import addUserToFirestore from './addUserToFirestore';

type TUserRegister = Pick<TUser, 'login' | 'email' | 'telegramLink' | 'password'>;

const register = async (
  { login, email, telegramLink, password }: TUserRegister,
  dispatch: AppDispatch,
) => {
  const userData = await addUserToFirestore({ login, email, telegramLink });
  dispatch(setActiveUser(userData));

  await createUser(email, password);
  // .then(async (userCredential) => {
  //   // Signed up
  //   const { user } = userCredential;
  // })
  // .catch((error) => {
  //   // const errorCode = error.code;
  //   const errorMessage = error.message;
  //   throw new Error(errorMessage);
  // });
};

export default register;
