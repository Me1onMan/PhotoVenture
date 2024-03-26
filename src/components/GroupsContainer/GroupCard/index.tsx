import { FC } from 'react';

import { Description, GroupCardContainer, Title, Type } from './styled';
import { TGroupCardProps } from './types';

const GroupCard: FC<TGroupCardProps> = ({ id, data }) => {
  const { title, description, type, membersId, ownerId } = data;
  return (
    <GroupCardContainer>
      <p>id: {id}</p>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Type>{type}</Type>
      <p>Owner id: {ownerId}</p>
      <h4>membersId: </h4>
      {membersId.map((el) => (
        <p key={el}>{el}</p>
      ))}
    </GroupCardContainer>
  );
};

export default GroupCard;
