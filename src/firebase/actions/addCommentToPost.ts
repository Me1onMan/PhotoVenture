import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';

import { COMMENTS_COLLECTION, POSTS_COLLECTION } from '../collections';
import { database } from '..';

const getIdAndCreateComment = async (comment: string, authorId: string) => {
  const commentRef = await addDoc(collection(database, COMMENTS_COLLECTION), {
    text: comment,
    authorId,
    createdAt: new Date(),
  });
  return commentRef.id;
};

const addCommentToPost = async (
  postId: string,
  prevComments: Array<string>,
  comment: string,
  authorId: string,
) => {
  const commentId = await getIdAndCreateComment(comment, authorId);
  const postRef = doc(database, POSTS_COLLECTION, postId);

  await updateDoc(postRef, {
    commentsId: [...prevComments, commentId],
  });
};

export default addCommentToPost;
