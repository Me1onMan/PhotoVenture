import { collection, getDocs } from 'firebase/firestore';

import { TUserCardProps } from '@/components/UsersContainer/UserCard/types';

import { USERS_COLLECTION } from '../collections';
import { database } from '..';

const getUsers = async () => {
  const usersSnapshot = await getDocs(collection(database, USERS_COLLECTION));
  const usersData = usersSnapshot.docs.map(
    (userData) =>
      ({
        id: userData.id,
        data: userData.data(),
      }) as TUserCardProps,
  );

  return usersData;
};

export default getUsers;
