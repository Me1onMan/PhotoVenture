import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  width: 400px;
  height: 50px;

  padding: 10px;

  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 10px;
`;

export const StyledSearch = styled.input`
  background: transparent;

  outline: none;
  border: none;

  width: 100%;
`;

export const ClearButton = styled.button`
  /* position: absolute;
  right: 8px;
  top: 4px; */

  background: none;
  border: none;

  padding: 4px;

  font-weight: 700;
`;

// export default StyledSearch;
