import { FC, MouseEvent } from 'react';

import addUserToGroup from '@/firebase/actions/addUserToGroup';
import removeUserFromGroup from '@/firebase/actions/removeUserFromGroup';
import useUsers from '@/hooks/useUsers';

import Button from '../../UI/Button';

import { ModalContainer, ModalWrapper } from './styled';
import { TModalAddMembersProps } from './types';

const ModalAddMember: FC<TModalAddMembersProps> = ({ closeModal, groupId, membersId }) => {
  const users = useUsers();

  const closeOnOutsideClick = (e: MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };

  const handleAddRemoveClick = (userId) => async () => {
    if (membersId.includes(userId)) {
      await removeUserFromGroup(groupId, membersId, userId);
    } else {
      await addUserToGroup(groupId, membersId, userId);
    }
  };

  return (
    <ModalWrapper onClick={closeOnOutsideClick}>
      <ModalContainer>
        <h1>Modal window!</h1>
        {users.length > 0 &&
          users.map((user) => (
            <div key={user.id}>
              <p>{user.data.login}</p>
              <button type="button" onClick={handleAddRemoveClick(user.id)}>
                {membersId.includes(user.id) ? 'Remove' : 'Add'}
              </button>
            </div>
          ))}
        <Button onClick={closeModal}>Close</Button>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default ModalAddMember;
