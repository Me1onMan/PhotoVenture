import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import likePost from '@/firebase/actions/likePost';
import usePhotosFromFirestore from '@/hooks/usePhotosFromFirestore';
import useUser from '@/hooks/useUser';
import { selectActiveUser } from '@/store/slices/activeUserSlice';
import isLikedByUser from '@/utils/isLikedByUser';

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
    likedByIds,
  } = data;
  const creationDate = createdAt.toDate().toString();

  const photos = usePhotosFromFirestore(photoLinks);

  const { id: userId } = useSelector(selectActiveUser);

  const [author, isAuthorLoading] = useUser(authorId);

  const handleLike = async () => {
    const newLikedByIds = isLikedByUser(userId, likedByIds)
      ? likedByIds.filter((likedById) => likedById !== userId)
      : [...likedByIds, userId];

    await likePost(id, newLikedByIds);
  };

  return (
    <PostContainer>
      {isAuthorLoading ? (
        <h4>Loading author...</h4>
      ) : (
        <div>
          <Author>Author: {author.data.login}</Author>
          <span>@{author.data.telegramLink}</span>
        </div>
      )}
      <p>id: {id}</p>
      <Title>
        <Link to={`/post/${id}`}>{title}</Link>
      </Title>
      {photos.length > 0 && photos.map((photo) => <img key={photo} src={photo} alt="Post file" />)}
      <Description>{description}</Description>
      <Emotion>Emotion: {emotion}</Emotion>
      <PostType>Type: {postType}</PostType>
      <Advices>Advices: {advices}</Advices>
      <Access>Access: {access}</Access>
      <GeoCoordinates>Geo coordinates: {geoCoordinates}</GeoCoordinates>
      <button type="button" onClick={handleLike}>
        {isLikedByUser(userId, likedByIds) ? 'Unlike' : 'Like'} {likedByIds.length}
      </button>
      <CreatedAt>Created at: {creationDate}</CreatedAt>
    </PostContainer>
  );
};

export default Post;
