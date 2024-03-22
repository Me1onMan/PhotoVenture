import { ChangeEvent, FC } from 'react';

import StyledInput from './styled';
import { TInputProps } from './types';

const Input: FC<TInputProps> = ({
  value,
  setValue,
  name,
  placeholder = '',
  type = 'text',
  pattern = '.*',
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <StyledInput
      value={value}
      onChange={handleChange}
      name={name}
      placeholder={placeholder}
      type={type}
      pattern={pattern}
    />
  );
};

export default Input;
