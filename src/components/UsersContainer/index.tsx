import { useEffect, useState } from 'react';

import getUsers from '@/firebase/actions/getUsers';

import { TUserCardProps } from './UserCard/types';
import { UsersStyledContainer } from './styled';
import UserCard from './UserCard';

const UsersContianer = () => {
  const [users, setUsers] = useState<Array<TUserCardProps>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        const loadedUsers = await getUsers();
        setUsers(loadedUsers);
      } catch (error) {
        console.log(error);
        throw new Error('Error occured in UsersContainer useEffect()');
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (isLoading) return <h1>Loading groups...</h1>;

  return (
    <UsersStyledContainer>
      <h1>Users Page</h1>
      {users.map(({ id, data }) => (
        <UserCard key={id} id={id} data={data} />
      ))}
    </UsersStyledContainer>
  );
};

export default UsersContianer;
