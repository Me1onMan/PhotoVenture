import { doc, getDoc } from 'firebase/firestore';

import { TCommentProps } from '@/components/PostsContainer/Post/Comments/Comment/types';

import { COMMENTS_COLLECTION } from '../collections';
import { database } from '..';

const getCommentsById = async (commentsId: Array<string>) => {
  const promises = commentsId.map((id) => {
    const docRef = doc(database, COMMENTS_COLLECTION, id);
    const promise = getDoc(docRef);
    return promise;
  });

  const commentsData = await Promise.all(promises);
  const comments = commentsData.map(
    (el) =>
      ({
        id: el.id,
        data: el.data(),
      }) as TCommentProps,
  );

  return comments;
};

export default getCommentsById;
