import { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';

import { MODAL } from '@/constants/cotainersId';
import usePostsForUser from '@/hooks/usePostsForUser';
import { selectActiveUser } from '@/store/slices/activeUserSlice';

import Post from '../PostsContainer/Post';
import Button from '../UI/Button';

import ModalEditProfile from './ModalEditProfile';
import { Login, Telegram, UserContainer } from './styled';
import { TProps } from './types';

const SingleUser: FC<TProps> = ({ id, data }) => {
  const { id: currentUserId } = useSelector(selectActiveUser);

  const { login, email, telegramLink } = data;
  const [posts, isPostsLoading] = usePostsForUser(id);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <UserContainer>
        <p>user id: {id}</p>
        <Login>{login}</Login>
        <Telegram>Telegram: {telegramLink}</Telegram>
        <p>Email: {email}</p>
        {id === currentUserId && <Button onClick={openModal}>Edit profile</Button>}
        <h3>Posts</h3>
        {isPostsLoading && <p>Loading posts...</p>}
        {!isPostsLoading && posts.length === 0 && <p>No posts.</p>}
        <div>
          {!isPostsLoading &&
            posts.length > 0 &&
            posts.map((post) => <Post key={post.id} id={post.id} data={post.data} />)}
        </div>
      </UserContainer>
      {isModalOpen &&
        createPortal(<ModalEditProfile closeModal={closeModal} userData={{ id, data }} />, MODAL)}
    </>
  );
};

export default SingleUser;
