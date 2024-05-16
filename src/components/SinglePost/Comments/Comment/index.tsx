import { FC } from 'react';

import useUser from '@/hooks/useUser';
import formatDate from '@/utils/formatDate';

import { Author, AuthotInfo, CommentContainer, CreatedAt, Telegram, Text } from './styled';
import { TCommentProps } from './types';

const Comment: FC<TCommentProps> = ({ data }) => {
  const { text, authorId, createdAt } = data;
  const [author, isAuthorLoading] = useUser(authorId);
  const creationDate = formatDate(createdAt.toDate());

  return (
    <CommentContainer>
      {isAuthorLoading ? (
        <h4>Loading author...</h4>
      ) : (
        <>
          <AuthotInfo>
            <Author>{author.data.login}</Author>
            <Telegram>@{author.data.telegramLink}</Telegram>
          </AuthotInfo>
          <CreatedAt>{creationDate}</CreatedAt>
        </>
      )}
      <Text>{text}</Text>
    </CommentContainer>
  );
};

export default Comment;
