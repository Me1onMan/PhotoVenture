import styled from 'styled-components';

export const ModalWrapper = styled.div`
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
  width: 70vw;
  height: 80vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background-color: goldenrod;
`;

export const IconProfile = styled.img`
  height: 200px;
`;
