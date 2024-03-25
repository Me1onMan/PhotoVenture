import { collection, getDocs, orderBy, query } from 'firebase/firestore';

import { TPostProps } from '@/components/PostsContainer/Post/types';
import { TSortOrder } from '@/types';

import { POSTS_COLLECTION } from '../collections';
import { database } from '..';

const getAllPosts = async (timeSortType: TSortOrder) => {
  const postsRef = collection(database, POSTS_COLLECTION);
  const q = query(postsRef, orderBy('createdAt', timeSortType));

  const postsSnapshot = await getDocs(q);

  const postsData = postsSnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      postData: doc.data(),
    };
  }) as TPostProps[];

  return postsData;
};

export default getAllPosts;
