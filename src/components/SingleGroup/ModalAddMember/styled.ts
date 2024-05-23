import styled from 'styled-components';

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  height: 260px;
  overflow-y: scroll;

  margin-top: 10px;
`;

export const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 400px;

  padding: 4px;
`;

export const Login = styled.p`
  font-size: 16px;
`;

export const AddRemoveButton = styled.button`
  padding: 4px 8px;

  background-color: ${({ theme }) => theme.buttonPrimary};

  border: none;
  border-radius: 10px;

  font-size: 16px;
  color: ${({ theme }) => theme.buttonTextPrimary};
`;
