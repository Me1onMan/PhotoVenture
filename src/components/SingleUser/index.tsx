import { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';

import { MODAL } from '@/constants/cotainersId';
import withModalWrapper from '@/HOCs/ModalWrapper';
import usePhotoFromFirestore from '@/hooks/usePhotoFromFirestore';
import usePostsForUser from '@/hooks/usePostsForUser';
import { selectActiveUser } from '@/store/slices/activeUserSlice';

import Post from '../PostsContainer/Post';
import Button from '../UI/Button';

import ModalEditProfile from './ModalEditProfile';
import {
  Container,
  EditButtonContainer,
  IconProfile,
  InfoContainer,
  Login,
  PostsTitle,
  Telegram,
  UserCardContainer,
} from './styled';
import { TProps } from './types';

const SingleUser: FC<TProps> = ({ id, data }) => {
  const { id: currentUserId } = useSelector(selectActiveUser);
  const { login, email, telegramLink, photoLink } = data;

  const photo = usePhotoFromFirestore(photoLink);

  const [posts, isPostsLoading] = usePostsForUser(id);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const EditProfile = withModalWrapper(closeModal, ModalEditProfile);

  return (
    <Container>
      <UserCardContainer>
        {photoLink && <IconProfile src={photo} alt={login} />}
        <InfoContainer>
          <Login>{login}</Login>
          <p>{email}</p>
          <Telegram>@{telegramLink}</Telegram>
        </InfoContainer>
        <EditButtonContainer>
          {id === currentUserId && <Button onClick={openModal}>Edit profile</Button>}
        </EditButtonContainer>
      </UserCardContainer>
      <PostsTitle>Posts</PostsTitle>
      {isPostsLoading && <p>Loading posts...</p>}
      {!isPostsLoading && posts.length === 0 && <p>No posts.</p>}
      {!isPostsLoading &&
        posts.length > 0 &&
        posts.map((post) => <Post key={post.id} id={post.id} data={post.data} />)}
      {isModalOpen && createPortal(<EditProfile userData={{ id, data }} />, MODAL)}
    </Container>
  );
};

export default SingleUser;
