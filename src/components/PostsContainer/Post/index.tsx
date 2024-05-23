import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import heartFilled from '@/../public/icons/heart-filled.svg';
import heartOutlined from '@/../public/icons/heart-outlined.svg';
import likePost from '@/firebase/actions/likePost';
import useGroupName from '@/hooks/useGroupName';
import usePhotosFromFirestore from '@/hooks/usePhotosFromFirestore';
import useUser from '@/hooks/useUser';
import { POSTS_PAGE_ROUTE } from '@/router/routes';
import { selectActiveUser } from '@/store/slices/activeUserSlice';
import formatDate from '@/utils/formatDate';
import isLikedByUser from '@/utils/isLikedByUser';

import {
  Access,
  Author,
  AuthorInfo,
  BottomSection,
  CreatedAt,
  Description,
  Emotion,
  FilterSection,
  GeoCoordinates,
  LikeButton,
  LikeIcon,
  Photo,
  PhotosContainer,
  PostContainer,
  PostType,
  Telegram,
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
    access,
    authorId,
    geoCoordinates,
    createdAt,
    likedByIds,
  } = data;

  const creationDate = formatDate(createdAt.toDate());

  const photos = usePhotosFromFirestore(photoLinks);

  const { id: userId } = useSelector(selectActiveUser);
  const [groupName, isLoadingGroup] = useGroupName(access);

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
        <>
          <AuthorInfo>
            <Author>
              <Link to={`/users/${authorId}`}>{author.data.login}</Link>
            </Author>
            <Telegram>@{author.data.telegramLink}</Telegram>
          </AuthorInfo>
          <CreatedAt>{creationDate}</CreatedAt>
        </>
      )}
      <Title>
        <Link to={`${POSTS_PAGE_ROUTE}/${id}`}>{title}</Link>
      </Title>
      <FilterSection>
        <PostType>{postType}</PostType>
        <Emotion>{emotion}</Emotion>
      </FilterSection>
      <PhotosContainer>
        {photos.length > 0 &&
          photos.map((photo) => <Photo key={photo} src={photo} alt="Post file" />)}
      </PhotosContainer>
      <Description>{description}</Description>
      {/* <Advices>Advices: {advices}</Advices> */}
      <BottomSection>
        <LikeButton type="button" onClick={handleLike}>
          {isLikedByUser(userId, likedByIds) ? (
            <LikeIcon src={heartFilled} alt="heart outlined" title="Больше не нравится" />
          ) : (
            <LikeIcon src={heartOutlined} alt="heart filled" title="Нравится" />
          )}{' '}
          {likedByIds.length}
        </LikeButton>
        <GeoCoordinates>
          <Link to={`/map/${geoCoordinates[0]}/${geoCoordinates[1]}`} replace>
            Показать на карте
          </Link>
        </GeoCoordinates>
        <Access>{isLoadingGroup ? 'Грузим...' : groupName}</Access>
      </BottomSection>
    </PostContainer>
  );
};

export default Post;
