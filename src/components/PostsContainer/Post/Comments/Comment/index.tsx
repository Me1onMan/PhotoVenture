import { FC } from 'react';

import { CommentContainer, Text } from './styled';
import { TCommentProps } from './types';

const Comment: FC<TCommentProps> = ({ id, data }) => {
  const { text, authorId, createdAt } = data;

  return (
    <CommentContainer>
      <p>id: {id}</p>
      <p>authorId: {authorId}</p>
      <Text>{text}</Text>
      <p>createdAt: {createdAt.toDate().toString()}</p>
    </CommentContainer>
  );
};

export default Comment;
