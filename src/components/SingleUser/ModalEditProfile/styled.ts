import styled from 'styled-components';

export const LabelEditProfile = styled.h1`
  color: ${({ theme }) => theme.headerPrimary};
`;

export const IconProfile = styled.img`
  height: 80px;
  width: 80px;

  margin-top: 10px;

  border-radius: 50%;
`;

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;

  margin-top: 10px;

  overflow-y: scroll;
`;
