import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';

import { TGroupCardProps } from '@/components/GroupsContainer/GroupCard/types';
import { database } from '@/firebase';
import { GROUPS_COLLECTION } from '@/firebase/collections';

const useGroupName = (groupId: string): [string, boolean] => {
  const [group, setGroup] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onSnapshot(doc(database, GROUPS_COLLECTION, groupId), (querySnapshot) => {
      const docSnapshot = {
        id: querySnapshot.id,
        data: querySnapshot.data(),
      } as TGroupCardProps;

      let groupName = '';
      if (groupId === 'public') groupName = 'Открытая';
      if (groupId === 'private') groupName = 'Закрытая';
      setGroup(docSnapshot.data ? docSnapshot.data.title : groupName);
      setIsLoading(false);
    });

    return unsubscribe;
  }, [groupId]);

  return [group, isLoading];
};

export default useGroupName;
