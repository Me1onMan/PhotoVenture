/* eslint-disable react/jsx-props-no-spreading */
import { FC, MouseEvent } from 'react';

import Button from '@/components/UI/Button';

import { ModalContainer, ModalWrapper } from './styled';

const withModalWrapper = (closeModal, WrappedComponent) => {
  const closeOnOutsideClick = (e: MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };

  const ModalWrapperComponent: FC = (props) => {
    return (
      <ModalWrapper onClick={closeOnOutsideClick}>
        <ModalContainer>
          <WrappedComponent {...props} />
          <Button onClick={closeModal}>Close</Button>
        </ModalContainer>
      </ModalWrapper>
    );
  };

  return ModalWrapperComponent;
};

export default withModalWrapper;
