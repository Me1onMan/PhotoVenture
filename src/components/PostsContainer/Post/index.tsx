import { FC } from 'react';

import AddCommentForm from '@/components/AddCommentForm';
import usePhotosFromFirestore from '@/hooks/usePhotosFromFirestore';

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
import { TPostProps } from './types';

const Post: FC<TPostProps> = ({ id, data }) => {
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
  } = data;
  const creationDate = createdAt.toDate().toString();

  const photos = usePhotosFromFirestore(photoLinks);

  return (
    <PostContainer>
      <p>id: {id}</p>
      <Title>{title}</Title>
      {photos.length > 0 && photos.map((photo) => <img key={photo} src={photo} alt="Post file" />)}
      <Description>{description}</Description>
      <Emotion>Emotion: {emotion}</Emotion>
      <PostType>Type: {postType}</PostType>
      <Advices>Advices: {advices}</Advices>
      <Access>Access: {access}</Access>
      <GeoCoordinates>Geo coordinates: {geoCoordinates}</GeoCoordinates>
      <CreatedAt>Created at: {creationDate}</CreatedAt>
      <Author>Author id: {authorId}</Author>
      <AddCommentForm postId={id} commentsId={commentsId} />
      <Comments commentsId={commentsId} />
    </PostContainer>
  );
};

export default Post;
