import { addDoc, collection } from 'firebase/firestore';

import { TGroupCreate } from '@/types';

import { GROUPS_COLLECTION } from '../collections';
import { database } from '..';

const addGroupToFirestore = async ({
  title,
  description,
  access,
  ownerId,
  photoLink,
}: TGroupCreate) => {
  try {
    await addDoc(collection(database, GROUPS_COLLECTION), {
      title,
      description,
      access,
      ownerId,
      membersId: [ownerId],
      photoLink,
    });
  } catch (error) {
    console.log(error);
    throw new Error('Error occured in addGroupToFirestore()');
  }
};

export default addGroupToFirestore;
