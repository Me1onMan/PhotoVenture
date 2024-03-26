import { FC } from 'react';

import { Login, Telegram, UserCardContainer } from './styled';
import { TUserCardProps } from './types';

const UserCard: FC<TUserCardProps> = ({ id, data }) => {
  const { login, email, telegramLink } = data;
  return (
    <UserCardContainer>
      <p>id: {id}</p>
      <Login>login: {login}</Login>
      <p>email: {email}</p>
      <Telegram>telegramLink: {telegramLink}</Telegram>
    </UserCardContainer>
  );
};

export default UserCard;
