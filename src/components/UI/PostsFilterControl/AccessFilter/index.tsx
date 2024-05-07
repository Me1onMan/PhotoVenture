import { FC } from 'react';

import AccessElement from './AccessElement';
import { TProps } from './types';

const AccessFilter: FC<TProps> = ({ groupsOptions }) => {
  return (
    <div>
      <AccessElement groupId="public" groupName="public" />
      <AccessElement groupId="private" groupName="private" />
      {groupsOptions.map(({ value, title }) => (
        <AccessElement key={value} groupId={value} groupName={title} />
      ))}
    </div>
  );
};

export default AccessFilter;
