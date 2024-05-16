import styled from 'styled-components';

export const ModalWrapper = styled.div`
  z-index: 10;
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

  padding: 20px;

  border-radius: 10px;

  background-color: ${({ theme }) => theme.backgroundSecondary};

  & > button {
    margin-top: 20px;

    max-width: 300px;
  }
`;
