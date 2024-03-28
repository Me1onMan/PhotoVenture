import { FC } from 'react';

import usePhotosFromFirestore from '@/hooks/usePhotosFromFirestore';

import AddCommentForm from '../AddCommentForm';

import Comments from './Comments';
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
import { TProps } from './types';

const SinglePost: FC<TProps> = ({ id, data }) => {
  const {
    title,
    description,
    photoLinks,
    emotion,
    postType,
    advices,
    access,
    geoCoordinates,
    createdAt,
    authorId,
    commentsId,
  } = data;

  const photos = usePhotosFromFirestore(photoLinks);

  return (
    <PostContainer>
      <p>postId: {id}</p>
      <Title>{title}</Title>
      {photos.length > 0 && photos.map((photo) => <img key={photo} src={photo} alt="Post file" />)}
      <Description>{description}</Description>
      <Emotion>Emotion: {emotion}</Emotion>
      <PostType>Type: {postType}</PostType>
      <Advices>Advices: {advices}</Advices>
      <Access>Access: {access}</Access>
      <GeoCoordinates>Geo coordinates: {geoCoordinates}</GeoCoordinates>
      <CreatedAt>Created at: {createdAt.toDate().toString()}</CreatedAt>
      <Author>Author id: {authorId}</Author>
      <AddCommentForm postId={id} commentsId={commentsId} />
      <Comments commentsId={commentsId} />
    </PostContainer>
  );
};

export default SinglePost;
