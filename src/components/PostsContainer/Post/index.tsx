import { FC } from 'react';

import usePhotosFromFirestore from '@/hooks/usePhotosFromFirestore';

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

  const photos = usePhotosFromFirestore(photoLinks);

  return (
    <PostContainer>
      <Title>{title}</Title>
      <p>id: {id}</p>
      {photos.length > 0 && photos.map((photo) => <img key={photo} src={photo} alt="Post file" />)}
      <Description>{description}</Description>
      <Emotion>{emotion}</Emotion>
      <PostType>{postType}</PostType>
      <Advices>{advices}</Advices>
      <Access>{access}</Access>
      <GeoCoordinates>{geoCoordinates}</GeoCoordinates>
      <CreatedAt>{creationDate}</CreatedAt>
      <Author>{authorId}</Author>
      <p>Comments id: {commentsId}</p>
    </PostContainer>
  );
};

export default Post;
