import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '@/components/UI/Button';
import addUserToGroup from '@/firebase/actions/addUserToGroup';
import removeUserFromGroup from '@/firebase/actions/removeUserFromGroup';
import { selectActiveUser } from '@/store/slices/activeUserSlice';

import { Access, Description, GroupCardContainer, Title } from './styled';
import { TGroupCardProps } from './types';

const GroupCard: FC<TGroupCardProps> = ({ id, data }) => {
  const { title, description, access, membersId, ownerId } = data;
  const { id: activeUserId } = useSelector(selectActiveUser);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isActiveUserInGroup = () => {
    return membersId.includes(activeUserId);
  };

  const joinGroup = async () => {
    try {
      setIsLoading(true);
      if (isActiveUserInGroup()) await removeUserFromGroup(id, membersId, activeUserId);
      else await addUserToGroup(id, membersId, activeUserId);
    } catch (error) {
      console.log(error);
      throw new Error('Error occured in GroupCard joinGroup()');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GroupCardContainer>
      <p>id: {id}</p>
      <Title>
        <Link to={`/group/${id}`}>{title}</Link>
      </Title>
      <Description>{description}</Description>
      <Access>{access}</Access>
      <p>Owner id: {ownerId}</p>
      <Button onClick={joinGroup} type="button" disabled={isLoading}>
        {isActiveUserInGroup() ? 'Leave' : 'Join'}
      </Button>
      <h4>membersId: </h4>
      {membersId.map((el) => (
        <p key={el}>{el}</p>
      ))}
    </GroupCardContainer>
  );
};

export default GroupCard;
