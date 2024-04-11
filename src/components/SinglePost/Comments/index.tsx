import { FC, useEffect, useState } from 'react';

import getCommentsById from '@/firebase/actions/getComments';

import { TCommentProps } from './Comment/types';
import Comment from './Comment';
import CommentsContainer from './styled';
import { TProps } from './types';

const Comments: FC<TProps> = ({ commentsId }) => {
  const [comments, setComments] = useState<Array<TCommentProps>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadComments = async () => {
      setIsLoading(true);
      try {
        const loadedComments = await getCommentsById(commentsId);
        setComments(loadedComments);
      } catch (error) {
        throw new Error('Error occured in Comments useEffect()');
      } finally {
        setIsLoading(false);
      }
    };

    loadComments();
  }, [commentsId]);

  if (isLoading) {
    return <p>Loading comments...</p>;
  }

  return (
    <CommentsContainer>
      {comments.map(({ id, data }) => (
        <Comment key={id} id={id} data={data} />
      ))}
    </CommentsContainer>
  );
};

export default Comments;
