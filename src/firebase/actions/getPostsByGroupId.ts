import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

import { TPostProps } from '@/components/PostsContainer/Post/types';

import { POSTS_COLLECTION } from '../collections';
import { database } from '..';

const getPostsByGroupId = async (groupId: string) => {
  const postsRef = collection(database, POSTS_COLLECTION);
  const q = query(postsRef, where('access', '==', groupId), orderBy('createdAt', 'desc'));

  const postsSnapshot = await getDocs(q);

  const postsData = postsSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        data: doc.data(),
      }) as TPostProps,
  );

  return postsData;
};

export default getPostsByGroupId;
