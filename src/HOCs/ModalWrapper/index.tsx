/* eslint-disable react/jsx-props-no-spreading */
import { ComponentType, FC, MouseEvent } from 'react';

import Button from '@/components/UI/Button';

import { ModalContainer, ModalWrapper } from './styled';
import { TModalProps } from './types';

const withModalWrapper = <P extends TModalProps>(
  closeModal: () => void,
  WrappedComponent: ComponentType<P>,
) => {
  const closeOnOutsideClick = (e: MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };

  const ModalWrapperComponent: FC<Omit<P, keyof TModalProps>> = (props) => {
    return (
      <ModalWrapper onClick={closeOnOutsideClick}>
        <ModalContainer>
          <WrappedComponent {...(props as P)} />
          <Button onClick={closeModal}>Close</Button>
        </ModalContainer>
      </ModalWrapper>
    );
  };

  return ModalWrapperComponent;
};

export default withModalWrapper;
