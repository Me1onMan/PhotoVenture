import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;

  & a {
    justify-self: flex-end;
    margin-top: 8px;
  }
`;

export const RegisterHeader = styled.h1`
  margin-bottom: 32px;

  font-size: 48px;

  color: #2e7d32;
`;

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 20px;
`;
