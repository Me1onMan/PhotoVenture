import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '@/components/UI/Button';
import addUserToGroup from '@/firebase/actions/addUserToGroup';
import removeUserFromGroup from '@/firebase/actions/removeUserFromGroup';
import usePhotoFromFirestore from '@/hooks/usePhotoFromFirestore';
import { GROUPS_PAGE_ROUTE } from '@/router/routes';
import { selectActiveUser } from '@/store/slices/activeUserSlice';

import { Access, Description, GroupCardContainer, IconProfile, Title } from './styled';
import { TGroupCardProps } from './types';

const GroupCard: FC<TGroupCardProps> = ({ id, data }) => {
  const { title, description, access, membersId, ownerId, photoLink } = data;
  const photo = usePhotoFromFirestore(photoLink);
  const { id: activeUserId } = useSelector(selectActiveUser);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isActiveUserInGroup = () => {
    return membersId.includes(activeUserId);
  };

  const isShowButton = () => {
    if (access === 'public') return true;
    if (access === 'private' && isActiveUserInGroup()) return true;
    return false;
  };

  const joinGroup = async () => {
    try {
      setIsLoading(true);
      if (isActiveUserInGroup()) await removeUserFromGroup(id, membersId, activeUserId);
      else await addUserToGroup(id, membersId, activeUserId);
    } catch (error) {
      throw new Error('Error occured in GroupCard joinGroup()');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GroupCardContainer>
      <p>id: {id}</p>
      <Title>
        <Link to={`${GROUPS_PAGE_ROUTE}/${id}`}>{title}</Link>
      </Title>
      {photoLink && <IconProfile src={photo} alt={title} />}
      <Description>{description}</Description>
      <Access>{access}</Access>
      <p>Owner id: {ownerId}</p>
      {isShowButton() && (
        <Button onClick={joinGroup} type="button" disabled={isLoading}>
          {isActiveUserInGroup() ? 'Leave' : 'Join'}
        </Button>
      )}
      <h4>membersId: </h4>
      {membersId.map((el) => (
        <p key={el}>{el}</p>
      ))}
    </GroupCardContainer>
  );
};

export default GroupCard;
