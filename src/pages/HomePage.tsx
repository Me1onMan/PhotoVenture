import { FC, useState } from 'react';
import { createPortal } from 'react-dom';

import AddPostForm from '@/components/AddPostForm';
import Navbar from '@/components/Navbar';
import PostsContainer from '@/components/PostsContainer';
import CreateButton from '@/components/UI/CreateButton';
import withModalWrapper from '@/HOCs/ModalWrapper';
import usePosts from '@/hooks/usePosts';

const MODAL = document.getElementById('modal');

const HomePage: FC = () => {
  const posts = usePosts();
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
      <PostsContainer posts={posts} />
      <CreateButton onClick={openModal} />
      {isModalOpen && createPortal(<AddModal />, MODAL)}
    </>
  );
};

// const readyComponent = withPageWrapper(HomePage);

export default HomePage;
