import styled from 'styled-components';

export const ButtonStyled = styled.button`
  position: fixed;
  right: 20px;
  bottom: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 5px;

  background-color: ${({ theme }) => theme.buttonPrimary};

  border: none;
  border-radius: 10px;
`;

export const ImgStyled = styled.img`
  width: 30px;
  height: 30px;
`;
