import { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';

import { TGroupCardProps } from '@/components/GroupsContainer/GroupCard/types';
import { database } from '@/firebase';
import { GROUPS_COLLECTION } from '@/firebase/collections';

const useGroups = () => {
  const [groups, setGroups] = useState<Array<TGroupCardProps>>([]);

  useEffect(() => {
    const q = query(collection(database, GROUPS_COLLECTION));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docsSnapshot = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            data: doc.data(),
          }) as TGroupCardProps,
      );

      setGroups(docsSnapshot);
    });

    return unsubscribe;
  }, []);

  return groups;
};

export default useGroups;
