/* eslint-disable react/jsx-props-no-spreading */
import { ComponentType, FC, MouseEvent } from 'react';

import Button from '@/components/UI/Button';

import { ModalContainer, ModalWrapper } from './styled';

const withModalWrapper = <P extends object>(
  closeModal: () => void,
  WrappedComponent: ComponentType<P>,
) => {
  const closeOnOutsideClick = (e: MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };

  const ModalWrapperComponent: FC<P> = (props) => {
    return (
      <ModalWrapper onClick={closeOnOutsideClick}>
        <ModalContainer>
          <WrappedComponent {...(props as P)} />
          <Button onClick={closeModal}>Закрыть</Button>
        </ModalContainer>
      </ModalWrapper>
    );
  };

  return ModalWrapperComponent;
};

export default withModalWrapper;
