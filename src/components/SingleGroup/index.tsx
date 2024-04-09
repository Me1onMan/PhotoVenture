import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import getPostsByGroupId from '@/firebase/actions/getPostsByGroupId';

import Post from '../PostsContainer/Post';
import { TPostProps } from '../PostsContainer/Post/types';
import Button from '../UI/Button';

import ModalAddMember from './ModalAddMember';
import { Access, Description, GroupContainer, Owner, Title } from './styled';
import { TProps } from './types';

const modalContainer = document.getElementById('modal');

const SingleGroup: FC<TProps> = ({ id, data }) => {
  const { title, description, access, ownerId, membersId } = data;
  const [posts, setPosts] = useState<TPostProps[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const loadedPosts = await getPostsByGroupId(id);
        setPosts(loadedPosts);
      } catch (error) {
        throw new Error(error);
      }
    };

    loadPosts();
  }, [id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <GroupContainer>
      <p>groupId: {id}</p>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Access>Type: {access}</Access>
      <Owner>Owner id: {ownerId}</Owner>
      <Button onClick={openModal}>Add member</Button>
      {isModalOpen &&
        createPortal(
          <ModalAddMember closeModal={closeModal} groupId={id} membersId={membersId} />,
          modalContainer,
        )}
      <h3>Members:</h3>
      {membersId.map((memberId, index) => (
        <p key={memberId}>
          {index}: {memberId}
        </p>
      ))}
      <h3>Posts</h3>
      <div>
        {posts.length > 0 &&
          posts.map((post) => <Post key={post.id} id={post.id} data={post.data} />)}
      </div>
    </GroupContainer>
  );
};

export default SingleGroup;
