import styled from 'styled-components';

const ButtonStyled = styled.button`
  width: 100%;

  padding: 10px;

  background-color: ${({ theme }) => theme.buttonPrimary};

  border: none;
  border-radius: 10px;

  font-size: 24px;
  color: #fff;
`;

export default ButtonStyled;
