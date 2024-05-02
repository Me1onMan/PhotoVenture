import { FC, useState } from 'react';
import { createPortal } from 'react-dom';

import AddPostForm from '@/components/AddPostForm';
import Navbar from '@/components/Navbar';
import PostsContainer from '@/components/PostsContainer';
import CreateButton from '@/components/UI/CreateButton';
import withModalWrapper from '@/HOCs/ModalWrapper';

const MODAL = document.getElementById('modal');

const HomePage: FC = () => {
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
      {/* <AddPostForm /> */}
      <PostsContainer />
      {isModalOpen && createPortal(<AddModal />, MODAL)}
    </>
  );
};

export default HomePage;
