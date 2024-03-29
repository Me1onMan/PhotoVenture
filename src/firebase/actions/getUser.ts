import { doc, getDoc } from 'firebase/firestore';

import { TUserCardProps } from '@/components/UsersContainer/UserCard/types';

import { USERS_COLLECTION } from '../collections';
import { database } from '..';

const getUser = async (userId: string) => {
  const userRef = doc(database, USERS_COLLECTION, userId);
  const userData = await getDoc(userRef);

  return {
    id: userData.id,
    data: userData.data(),
  } as TUserCardProps;
};

export default getUser;
