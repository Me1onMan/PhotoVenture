import useUsers from '@/hooks/useUsers';

import { UsersStyledContainer } from './styled';
import UserCard from './UserCard';

const UsersContianer = () => {
  const users = useUsers();

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
