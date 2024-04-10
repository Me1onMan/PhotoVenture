import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';

import { TUserCardProps } from '@/components/UsersContainer/UserCard/types';
import { database } from '@/firebase';
import { USERS_COLLECTION } from '@/firebase/collections';

const useUser = (userId: string): [TUserCardProps, boolean] => {
  const [user, setUser] = useState<TUserCardProps>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(database, USERS_COLLECTION, userId), (querySnapshot) => {
      const docSnapshot = {
        id: querySnapshot.id,
        data: querySnapshot.data(),
      } as TUserCardProps;

      setUser(docSnapshot);
      setIsLoading(false);
    });

    return unsubscribe;
  }, [userId]);

  return [user, isLoading];
};

export default useUser;
