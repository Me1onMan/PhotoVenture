import { FC, useState } from 'react';
import { createPortal } from 'react-dom';

import withModalWrapper from '@/HOCs/ModalWrapper';
import usePostsForGroup from '@/hooks/usePostsForGroup';

import Post from '../PostsContainer/Post';
import Button from '../UI/Button';

import ModalAddMember from './ModalAddMember';
import { Access, Description, GroupContainer, Owner, Title } from './styled';
import { TProps } from './types';

const modalContainer = document.getElementById('modal');

const SingleGroup: FC<TProps> = ({ id, data }) => {
  const { title, description, access, ownerId, membersId } = data;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [posts, isPostsLoading] = usePostsForGroup(id);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const AddMember = withModalWrapper(closeModal, ModalAddMember);

  return (
    <GroupContainer>
      <p>groupId: {id}</p>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Access>Type: {access}</Access>
      <Owner>Owner id: {ownerId}</Owner>
      <Button onClick={openModal}>Add member</Button>
      {isModalOpen &&
        createPortal(<AddMember groupId={id} membersId={membersId} />, modalContainer)}
      <h3>Members:</h3>
      {membersId.map((memberId, index) => (
        <p key={memberId}>
          {index}: {memberId}
        </p>
      ))}
      <h3>Posts</h3>
      {isPostsLoading && <p>Loading posts...</p>}
      {!isPostsLoading && posts.length === 0 && <p>No posts.</p>}
      <div>
        {!isPostsLoading &&
          posts.length > 0 &&
          posts.map((post) => <Post key={post.id} id={post.id} data={post.data} />)}
      </div>
    </GroupContainer>
  );
};

export default SingleGroup;
