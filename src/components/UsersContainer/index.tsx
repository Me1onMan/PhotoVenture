import { useEffect, useState } from 'react';

import useUsers from '@/hooks/useUsers';
import searchUsers from '@/utils/searchUsers';

import Search from '../UI/Search';

import { TUserCardProps } from './UserCard/types';
import { UsersStyledContainer } from './styled';
import UserCard from './UserCard';

const UsersContianer = () => {
  const users = useUsers();
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<TUserCardProps[]>(users);

  useEffect(() => {
    setFilteredUsers(users.filter((user) => searchUsers(user.data, searchValue)));
  }, [users, searchValue]);

  return (
    <UsersStyledContainer>
      <h1>Users Page</h1>
      <Search
        value={searchValue}
        setValue={setSearchValue}
        name="usersSearch"
        placeholder="Search in users"
      />
      {filteredUsers.map(({ id, data }) => (
        <UserCard key={id} id={id} data={data} />
      ))}
    </UsersStyledContainer>
  );
};

export default UsersContianer;
