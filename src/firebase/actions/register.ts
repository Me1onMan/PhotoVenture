import { TUser } from '@/types';

import { createUser } from '..';

import addUserToFirestore from './addUserToFirestore';

type TUserRegister = Pick<TUser, 'login' | 'email' | 'telegramLink' | 'password'>;

const register = ({ login, email, telegramLink, password }: TUserRegister) => {
  createUser(email, password)
    .then((userCredential) => {
      // Signed up
      const { user } = userCredential;
      addUserToFirestore({ login, email, telegramLink });
      console.log(`User: ${user.email}`);
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      throw new Error(errorMessage);
    });
};

export default register;
