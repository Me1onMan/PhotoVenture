import { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';

import { MODAL } from '@/constants/cotainersId';
import addUserToGroup from '@/firebase/actions/addUserToGroup';
import removeUserFromGroup from '@/firebase/actions/removeUserFromGroup';
import withModalWrapper from '@/HOCs/ModalWrapper';
import usePhotoFromFirestore from '@/hooks/usePhotoFromFirestore';
import usePostsForGroup from '@/hooks/usePostsForGroup';
import useUser from '@/hooks/useUser';
import { selectActiveUser } from '@/store/slices/activeUserSlice';
import defineMembersWord from '@/utils/defineMembersWord';

import Post from '../PostsContainer/Post';
import Button from '../UI/Button';

import ModalAddMember from './ModalAddMember';
import {
  Access,
  AddButtonContainer,
  BottomSection,
  ButtonContainer,
  Description,
  GroupCardContainer,
  GroupContainer,
  IconProfile,
  InfoBlock,
  Members,
  Owner,
  OwnerInfo,
  PostsTitle,
  Telegram,
  Title,
  TopSection,
} from './styled';
import { TProps } from './types';

const SingleGroup: FC<TProps> = ({ id, data }) => {
  const { title, description, access, ownerId, membersId, photoLink } = data;

  const { id: activeUserId } = useSelector(selectActiveUser);

  const photo = usePhotoFromFirestore(photoLink);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [posts, isPostsLoading] = usePostsForGroup(id);
  const [author, isAuthorLoading] = useUser(ownerId);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const isActiveUserInGroup = () => {
    return membersId.includes(activeUserId);
  };

  const isShowButton = () => {
    if (access === 'public') return true;
    if (access === 'private' && isActiveUserInGroup()) return true;
    return false;
  };

  const joinGroup = async () => {
    try {
      setIsLoading(true);
      if (isActiveUserInGroup()) await removeUserFromGroup(id, membersId, activeUserId);
      else await addUserToGroup(id, membersId, activeUserId);
    } catch (error) {
      throw new Error('Error occured in GroupCard joinGroup()');
    } finally {
      setIsLoading(false);
    }
  };

  const AddMember = withModalWrapper(closeModal, ModalAddMember);

  return (
    <>
      <GroupContainer>
        <GroupCardContainer>
          <TopSection>
            {photoLink && <IconProfile src={photo} alt={title} />}
            <InfoBlock>
              <Title>{title}</Title>
              <Description>{description}</Description>
              {isAuthorLoading ? (
                <h4>Loading author...</h4>
              ) : (
                <OwnerInfo>
                  <Owner>{author.data.login}</Owner>
                  <Telegram>@{author.data.telegramLink}</Telegram>
                </OwnerInfo>
              )}
            </InfoBlock>
          </TopSection>
          <AddButtonContainer>
            <Button onClick={openModal}>Добавить участников</Button>
          </AddButtonContainer>
          <BottomSection>
            <Members>
              {membersId.length} {defineMembersWord(membersId.length)}
            </Members>
            <Access>{access}</Access>
            {isShowButton() && (
              <ButtonContainer>
                <Button onClick={joinGroup} type="button" disabled={isLoading}>
                  {isActiveUserInGroup() ? 'Покинуть' : 'Вступить'}
                </Button>
              </ButtonContainer>
            )}
          </BottomSection>
        </GroupCardContainer>
        <PostsTitle>Posts</PostsTitle>
        {isPostsLoading && <p>Loading posts...</p>}
        {!isPostsLoading && posts.length === 0 && <p>No posts.</p>}
        <div>
          {!isPostsLoading &&
            posts.length > 0 &&
            posts.map((post) => <Post key={post.id} id={post.id} data={post.data} />)}
        </div>
      </GroupContainer>
      {isModalOpen && createPortal(<AddMember groupId={id} membersId={membersId} />, MODAL)}
    </>
  );
};

export default SingleGroup;
