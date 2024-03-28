import { doc, getDoc } from 'firebase/firestore';

import { TPostProps } from '@/components/PostsContainer/Post/types';

import { POSTS_COLLECTION } from '../collections';
import { database } from '..';

const getSinglePost = async (postId: string) => {
  const postRef = doc(database, POSTS_COLLECTION, postId);
  const postData = await getDoc(postRef);

  return {
    id: postData.id,
    data: postData.data(),
  } as TPostProps;
};

export default getSinglePost;
