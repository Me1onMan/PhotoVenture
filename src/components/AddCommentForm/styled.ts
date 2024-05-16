import styled from 'styled-components';

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InputContainer = styled.div`
  width: 100%;

  & input {
    width: 100%;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 10px;

  max-width: 250px;
  align-self: flex-end;
`;
