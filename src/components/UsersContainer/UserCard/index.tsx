import { FC } from 'react';
import { Link } from 'react-router-dom';

import usePhotoFromFirestore from '@/hooks/usePhotoFromFirestore';

import { IconProfile, Login, Telegram, UserCardContainer } from './styled';
import { TUserCardProps } from './types';

const UserCard: FC<TUserCardProps> = ({ id, data }) => {
  const { login, email, telegramLink, photoLink } = data;
  const photo = usePhotoFromFirestore(photoLink);

  return (
    <UserCardContainer>
      <p>id: {id}</p>
      <Login>
        login: <Link to={`/user/${id}`}>{login}</Link>
      </Login>
      {photoLink && <IconProfile src={photo} alt={login} />}
      <p>email: {email}</p>
      <Telegram>telegramLink: {telegramLink}</Telegram>
    </UserCardContainer>
  );
};

export default UserCard;
