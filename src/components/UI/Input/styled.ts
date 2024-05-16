import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 10px;

  background-color: ${({ theme }) => theme.backgroundPrimary};

  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 10px;

  font-size: 24px;
`;

export default StyledInput;
