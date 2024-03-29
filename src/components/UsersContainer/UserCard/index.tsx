import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Login, Telegram, UserCardContainer } from './styled';
import { TUserCardProps } from './types';

const UserCard: FC<TUserCardProps> = ({ id, data }) => {
  const { login, email, telegramLink } = data;
  return (
    <UserCardContainer>
      <p>id: {id}</p>
      <Login>
        login: <Link to={`/user/${id}`}>{login}</Link>
      </Login>
      <p>email: {email}</p>
      <Telegram>telegramLink: {telegramLink}</Telegram>
    </UserCardContainer>
  );
};

export default UserCard;
