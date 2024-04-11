import { doc, updateDoc } from 'firebase/firestore';

import { GROUPS_COLLECTION } from '../collections';
import { database } from '..';

const addUserToGroup = async (groupId: string, prevUsersId: Array<string>, userId: string) => {
  const groupRef = doc(database, GROUPS_COLLECTION, groupId);

  await updateDoc(groupRef, {
    membersId: [...prevUsersId, userId],
  });
};

export default addUserToGroup;
