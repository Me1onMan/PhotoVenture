import { FC } from 'react';

import ButtonStyled from './styled';
import { TProps } from './types';

const CreateButton: FC<TProps> = ({ children, onClick, disabled = false, type = 'button' }) => {
  return (
    <ButtonStyled type={type} onClick={onClick} disabled={disabled}>
      {children}
    </ButtonStyled>
  );
};

export default CreateButton;
