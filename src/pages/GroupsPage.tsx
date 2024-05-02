import { useState } from 'react';
import { createPortal } from 'react-dom';

import AddGroupForm from '@/components/AddGroupForm';
import GroupsContainer from '@/components/GroupsContainer';
import Navbar from '@/components/Navbar';
import CreateButton from '@/components/UI/CreateButton';
import withModalWrapper from '@/HOCs/ModalWrapper';

const MODAL = document.getElementById('modal');

const GroupsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const AddModal = withModalWrapper(closeModal, AddGroupForm);

  return (
    <>
      <Navbar />
      {/* <AddGroupForm /> */}
      <CreateButton onClick={openModal}>+</CreateButton>

      <GroupsContainer />
      {isModalOpen && createPortal(<AddModal />, MODAL)}
    </>
  );
};

export default GroupsPage;
