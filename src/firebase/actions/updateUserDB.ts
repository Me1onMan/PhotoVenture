import { doc, updateDoc } from 'firebase/firestore';

import { USERS_COLLECTION } from '../collections';
import { database } from '..';

const updateUserDB = async (
  userId: string,
  newLogin: string,
  newTelegramLink: string,
  newEmail?: string,
) => {
  const userRef = doc(database, USERS_COLLECTION, userId);

  const updatedFileds = newEmail
    ? { login: newLogin, telegramLink: newTelegramLink, email: newEmail }
    : { login: newLogin, telegramLink: newTelegramLink };

  await updateDoc(userRef, updatedFileds);
};

export default updateUserDB;
