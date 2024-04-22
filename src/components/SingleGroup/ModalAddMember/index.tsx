import { FC, MouseEvent, useEffect, useState } from 'react';

import Search from '@/components/UI/Search';
import { TUserCardProps } from '@/components/UsersContainer/UserCard/types';
import addUserToGroup from '@/firebase/actions/addUserToGroup';
import removeUserFromGroup from '@/firebase/actions/removeUserFromGroup';
import useUsers from '@/hooks/useUsers';
import searchUsers from '@/utils/searchUsers';

import Button from '../../UI/Button';

import { ModalContainer, ModalWrapper } from './styled';
import { TModalAddMembersProps } from './types';

const ModalAddMember: FC<TModalAddMembersProps> = ({ closeModal, groupId, membersId }) => {
  const users = useUsers();
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<TUserCardProps[]>(users);

  useEffect(() => {
    setFilteredUsers(users.filter((user) => searchUsers(user.data, searchValue)));
  }, [users, searchValue]);

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
        <Search
          value={searchValue}
          setValue={setSearchValue}
          name="usersSearch"
          placeholder="Search in users"
        />
        {filteredUsers.length > 0 &&
          filteredUsers.map((user) => (
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
