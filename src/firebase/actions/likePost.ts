import { doc, updateDoc } from 'firebase/firestore';

import { POSTS_COLLECTION } from '../collections';
import { database } from '..';

const likePost = async (postId: string, newLikedByIds: string[]) => {
  const postRef = doc(database, POSTS_COLLECTION, postId);
  await updateDoc(postRef, {
    likedByIds: newLikedByIds,
  });
};

export default likePost;
