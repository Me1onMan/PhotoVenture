import { FC } from 'react';

import {
  Access,
  Advices,
  Author,
  CreatedAt,
  Description,
  Emotion,
  GeoCoordinates,
  PostContainer,
  PostType,
  Title,
} from './styled';
import { TPostProps } from './types';

const Post: FC<TPostProps> = ({ id, postData }) => {
  //   if (!postData) return null;
  const {
    title,
    description,
    photoLinks,
    emotion,
    postType,
    advices,
    access,
    authorId,
    geoCoordinates,
    createdAt,
    commentsId,
  } = postData;

  const creationDate = createdAt.toDate().toString();
  //   console.log(creationDate);

  console.log(id);
  console.log(photoLinks);
  console.log(commentsId);

  return (
    <PostContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Emotion>{emotion}</Emotion>
      <PostType>{postType}</PostType>
      <Advices>{advices}</Advices>
      <Access>{access}</Access>
      <GeoCoordinates>{geoCoordinates}</GeoCoordinates>
      <CreatedAt>{creationDate}</CreatedAt>
      <Author>{authorId}</Author>
    </PostContainer>
  );
};

export default Post;
