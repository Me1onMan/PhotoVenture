import { FC } from 'react';
import { useSelector } from 'react-redux';

import likePost from '@/firebase/actions/likePost';
import usePhotosFromFirestore from '@/hooks/usePhotosFromFirestore';
import { selectActiveUser } from '@/store/slices/activeUserSlice';
import isLikedByUser from '@/utils/isLikedByUser';

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
    likedByIds,
  } = data;

  const photos = usePhotosFromFirestore(photoLinks);

  const { id: userId } = useSelector(selectActiveUser);

  const handleLike = async () => {
    const newLikedByIds = isLikedByUser(userId, likedByIds)
      ? likedByIds.filter((likedById) => likedById !== userId)
      : [...likedByIds, userId];

    await likePost(id, newLikedByIds);
  };

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
      <button type="button" onClick={handleLike}>
        {isLikedByUser(userId, likedByIds) ? 'Unlike' : 'Like'} {likedByIds.length}
      </button>
      <AddCommentForm postId={id} commentsId={commentsId} />
      <Comments commentsId={commentsId} />
    </PostContainer>
  );
};

export default SinglePost;
