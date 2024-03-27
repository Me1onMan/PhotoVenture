import { doc, updateDoc } from 'firebase/firestore';

import { GROUPS_COLLECTION } from '../collections';
import { database } from '..';

const removeUserFromGroup = async (groupId: string, prevUsers: Array<string>, userId: string) => {
  const updatedUsers = prevUsers.filter((id) => id !== userId);

  const groupRef = doc(database, GROUPS_COLLECTION, groupId);

  await updateDoc(groupRef, {
    membersId: [...updatedUsers],
  });
};

export default removeUserFromGroup;
