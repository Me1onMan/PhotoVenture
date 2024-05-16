import styled from 'styled-components';

export const ModalWrapper = styled.div`
  z-index: 20;
  position: fixed;
  left: 0;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContainer = styled.div`
  width: 80vw;
  height: 80vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  background-color: ${({ theme }) => theme.backgroundSecondary};

  border-radius: 10px;

  & button {
    max-width: 200px;
  }
`;
