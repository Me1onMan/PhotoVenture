import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addAccess, removeAccess } from '@/store/slices/filterOptionsSlice';

import { TProps } from './types';

const AccessElement: FC<TProps> = ({ groupId, groupName, isSelected }) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState<boolean>(isSelected);

  const handleToggle = () => {
    if (isChecked) {
      dispatch(removeAccess(groupId));
      setIsChecked(false);
    } else {
      dispatch(addAccess(groupId));
      setIsChecked(true);
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label>
      <input type="checkbox" value={groupId} checked={isChecked} onChange={handleToggle} />
      {groupName}
    </label>
  );
};

export default AccessElement;
