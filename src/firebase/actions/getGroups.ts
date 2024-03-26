import { collection, getDocs } from 'firebase/firestore';

import { TGroupCardProps } from '@/components/GroupsContainer/GroupCard/types';

import { GROUPS_COLLECTION } from '../collections';
import { database } from '..';

const getGroups = async () => {
  const groupsSnapshot = await getDocs(collection(database, GROUPS_COLLECTION));
  const groupsData = groupsSnapshot.docs.map(
    (groupData) =>
      ({
        id: groupData.id,
        data: groupData.data(),
      }) as TGroupCardProps,
  );

  return groupsData;
};

export default getGroups;
