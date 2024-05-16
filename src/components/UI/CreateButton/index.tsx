import { FC } from 'react';

import plusIcon from '@/../public/icons/plus.svg';

import { ButtonStyled, ImgStyled } from './styled';
import { TProps } from './types';

const CreateButton: FC<TProps> = ({ onClick, disabled = false, type = 'button' }) => {
  return (
    <ButtonStyled type={type} onClick={onClick} disabled={disabled}>
      <ImgStyled src={plusIcon} alt="cross" title="Create" />
    </ButtonStyled>
  );
};

export default CreateButton;
