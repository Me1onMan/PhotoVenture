import { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';

import AddPostForm from '@/components/AddPostForm';
import Navbar from '@/components/Navbar';
import PostsContainer from '@/components/PostsContainer';
import CreateButton from '@/components/UI/CreateButton';
import withModalWrapper from '@/HOCs/ModalWrapper';
import useLikedPosts from '@/hooks/useLikedPosts';
import { selectActiveUser } from '@/store/slices/activeUserSlice';

const MODAL = document.getElementById('modal');

const LikesPage: FC = () => {
  const { id: userId } = useSelector(selectActiveUser);
  const likedPosts = useLikedPosts(userId);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const AddModal = withModalWrapper(closeModal, AddPostForm);

  return (
    <>
      <Navbar />
      <CreateButton onClick={openModal}>+</CreateButton>
      <PostsContainer posts={likedPosts} />
      {isModalOpen && createPortal(<AddModal />, MODAL)}
    </>
  );
};

export default LikesPage;
