import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Search from '@/components/UI/Search';
import { TUserCardProps } from '@/components/UsersContainer/UserCard/types';
import addUserToGroup from '@/firebase/actions/addUserToGroup';
import removeUserFromGroup from '@/firebase/actions/removeUserFromGroup';
import useUsers from '@/hooks/useUsers';
import searchUsers from '@/utils/searchUsers';

import { AddRemoveButton, ListContainer, Login, UserContainer } from './styled';
import { TModalAddMembersProps } from './types';

const ModalAddMember: FC<TModalAddMembersProps> = ({ groupId, membersId }) => {
  const users = useUsers();
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<TUserCardProps[]>(users);

  useEffect(() => {
    setFilteredUsers(users.filter((user) => searchUsers(user.data, searchValue)));
  }, [users, searchValue]);

  const handleAddRemoveClick = (userId) => async () => {
    if (membersId.includes(userId)) {
      await removeUserFromGroup(groupId, membersId, userId);
    } else {
      await addUserToGroup(groupId, membersId, userId);
    }
  };

  return (
    <>
      <Search
        value={searchValue}
        setValue={setSearchValue}
        name="usersSearch"
        placeholder="Search in users"
      />
      <ListContainer>
        {filteredUsers.length > 0 &&
          filteredUsers.map((user) => (
            <UserContainer key={user.id}>
              <Link to={`/users/${user.id}`} target="_blank">
                <Login>{user.data.login}</Login>
              </Link>
              <AddRemoveButton type="button" onClick={handleAddRemoveClick(user.id)}>
                {membersId.includes(user.id) ? 'Remove' : 'Add'}
              </AddRemoveButton>
            </UserContainer>
          ))}
      </ListContainer>
    </>
  );
};

export default ModalAddMember;
