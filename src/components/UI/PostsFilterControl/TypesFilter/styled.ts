import styled from 'styled-components';

export const ButtonContainer = styled.div``;

export const FilterLabelButton = styled.button`
  padding: 8px;

  font-size: 16px;
`;

export const FiltersContainer = styled.div`
  z-index: 2;
  position: absolute;

  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 10px;

  background-color: ${({ theme }) => theme.backgroundPrimary};

  border: 1px solid #546e7a;
  border-radius: 10px;
`;
