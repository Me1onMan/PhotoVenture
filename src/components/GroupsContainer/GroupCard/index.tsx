import { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import Button from '@/components/UI/Button';
import addUserToGroup from '@/firebase/actions/addUserToGroup';
import removeUserFromGroup from '@/firebase/actions/removeUserFromGroup';
import { selectActiveUser } from '@/store/slices/activeUserSlice';

import { Description, GroupCardContainer, Title, Type } from './styled';
import { TGroupCardProps } from './types';

const GroupCard: FC<TGroupCardProps> = ({ id, data }) => {
  const { title, description, type, membersId, ownerId } = data;
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
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Type>{type}</Type>
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
