import { doc, getDoc } from 'firebase/firestore';

import { TGroupCardProps } from '@/components/GroupsContainer/GroupCard/types';

import { GROUPS_COLLECTION } from '../collections';
import { database } from '..';

const getGroup = async (groupId: string) => {
  const groupRef = doc(database, GROUPS_COLLECTION, groupId);
  const groupData = await getDoc(groupRef);

  return {
    id: groupData.id,
    data: groupData.data(),
  } as TGroupCardProps;
};

export default getGroup;
