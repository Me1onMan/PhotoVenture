import { FC } from 'react';

import { Description, GroupContainer, Owner, Title, Type } from './styled';
import { TProps } from './types';

const SingleGroup: FC<TProps> = ({ id, data }) => {
  const { title, description, type, ownerId, membersId } = data;

  return (
    <GroupContainer>
      <p>groupId: {id}</p>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Type>Type: {type}</Type>
      <Owner>Owner id: {ownerId}</Owner>
      <h3>Members:</h3>
      {membersId.map((memberId, index) => (
        <p key={memberId}>
          {index}: {memberId}
        </p>
      ))}
    </GroupContainer>
  );
};

export default SingleGroup;
