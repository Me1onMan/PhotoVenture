import { FC } from 'react';
import { Link } from 'react-router-dom';

import usePhotoFromFirestore from '@/hooks/usePhotoFromFirestore';
import { USERS_PAGE_ROUTE } from '@/router/routes';

import { IconProfile, InfoContainer, Login, Telegram, UserCardContainer } from './styled';
import { TUserCardProps } from './types';

const UserCard: FC<TUserCardProps> = ({ id, data }) => {
  const { login, email, telegramLink, photoLink } = data;
  const photo = usePhotoFromFirestore(photoLink);

  return (
    <UserCardContainer>
      {photoLink && <IconProfile src={photo} alt={login} />}
      <InfoContainer>
        <Login>
          <Link to={`${USERS_PAGE_ROUTE}/${id}`}>{login}</Link>
        </Login>
        <p>{email}</p>
        <Telegram>@{telegramLink}</Telegram>
      </InfoContainer>
    </UserCardContainer>
  );
};

export default UserCard;
