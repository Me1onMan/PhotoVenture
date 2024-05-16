import { FC } from 'react';
import { useSelector } from 'react-redux';

import heartFilled from '@/../public/icons/heart-filled.svg';
import heartOutlined from '@/../public/icons/heart-outlined.svg';
import likePost from '@/firebase/actions/likePost';
import useGroupName from '@/hooks/useGroupName';
import usePhotosFromFirestore from '@/hooks/usePhotosFromFirestore';
import useUser from '@/hooks/useUser';
import { selectActiveUser } from '@/store/slices/activeUserSlice';
import formatDate from '@/utils/formatDate';
import isLikedByUser from '@/utils/isLikedByUser';

import AddCommentForm from '../AddCommentForm';

import Comments from './Comments';
import {
  Access,
  Advices,
  Author,
  AuthotInfo,
  BottomSection,
  Container,
  CreatedAt,
  Description,
  Emotion,
  FilterSection,
  GeoCoordinates,
  LikeButton,
  LikeIcon,
  PhotosContainer,
  PostContainer,
  PostType,
  Telegram,
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

  const [author, isAuthorLoading] = useUser(authorId);
  const [groupName, isLoadingGroup] = useGroupName(access);

  const creationDate = formatDate(createdAt.toDate());

  const handleLike = async () => {
    const newLikedByIds = isLikedByUser(userId, likedByIds)
      ? likedByIds.filter((likedById) => likedById !== userId)
      : [...likedByIds, userId];

    await likePost(id, newLikedByIds);
  };

  return (
    <Container>
      <PostContainer>
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
        <Title>{title}</Title>
        <FilterSection>
          <PostType>{postType}</PostType>
          <Emotion>{emotion}</Emotion>
        </FilterSection>
        <PhotosContainer>
          {photos.length > 0 &&
            photos.map((photo) => <img key={photo} src={photo} alt="Post file" />)}
        </PhotosContainer>{' '}
        <Description>{description}</Description>
        <Advices>Advices: {advices}</Advices>
        <BottomSection>
          <LikeButton type="button" onClick={handleLike}>
            {isLikedByUser(userId, likedByIds) ? (
              <LikeIcon src={heartFilled} alt="heart outlined" title="Больше не нравится" />
            ) : (
              <LikeIcon src={heartOutlined} alt="heart filled" title="Нравится" />
            )}{' '}
            {likedByIds.length}
          </LikeButton>
          <GeoCoordinates>{geoCoordinates}</GeoCoordinates>
          <Access>{isLoadingGroup ? 'Грузим...' : groupName}</Access>
        </BottomSection>
      </PostContainer>
      <AddCommentForm postId={id} commentsId={commentsId} />
      <Comments commentsId={commentsId} />
    </Container>
  );
};

export default SinglePost;
