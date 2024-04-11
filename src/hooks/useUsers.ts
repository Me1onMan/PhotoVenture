import { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';

import { TUserCardProps } from '@/components/UsersContainer/UserCard/types';
import { database } from '@/firebase';
import { USERS_COLLECTION } from '@/firebase/collections';

const useUsers = () => {
  const [users, setUsers] = useState<Array<TUserCardProps>>([]);

  useEffect(() => {
    const q = query(collection(database, USERS_COLLECTION));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docsSnapshot = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            data: doc.data(),
          }) as TUserCardProps,
      );

      setUsers(docsSnapshot);
    });

    return unsubscribe;
  }, []);

  return users;
};

export default useUsers;
