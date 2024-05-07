import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addEmotion, removeEmotion } from '@/store/slices/filterOptionsSlice';

import { TProps } from './types';

const EmotionElement: FC<TProps> = ({ emotion }) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleToggle = () => {
    if (isChecked) {
      dispatch(removeEmotion(emotion));
      setIsChecked(false);
    } else {
      dispatch(addEmotion(emotion));
      setIsChecked(true);
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label>
      <input type="checkbox" value={emotion} checked={isChecked} onChange={handleToggle} />
      {emotion}
    </label>
  );
};

export default EmotionElement;
