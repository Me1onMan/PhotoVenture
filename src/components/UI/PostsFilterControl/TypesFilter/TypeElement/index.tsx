import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addType, removeType } from '@/store/slices/filterOptionsSlice';

import { TProps } from './types';

const TypeElement: FC<TProps> = ({ postType }) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleToggle = () => {
    if (isChecked) {
      dispatch(removeType(postType));
      setIsChecked(false);
    } else {
      dispatch(addType(postType));
      setIsChecked(true);
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label>
      <input type="checkbox" value={postType} checked={isChecked} onChange={handleToggle} />
      {postType}
    </label>
  );
};

export default TypeElement;
