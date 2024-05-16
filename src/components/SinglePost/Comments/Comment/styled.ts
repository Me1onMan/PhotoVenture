import styled from 'styled-components';

export const CommentContainer = styled.div`
  border-left: 5px solid ${({ theme }) => theme.buttonPrimary};
  padding-left: 10px;
`;

export const AuthotInfo = styled.div`
  display: flex;
  gap: 12px;

  align-items: center;
`;

export const Author = styled.p`
  font-size: 20px;
  font-weight: 700;
`;

export const Telegram = styled.p`
  color: gray;
`;

export const CreatedAt = styled.p`
  font-size: 14px;
`;

export const Text = styled.p`
  margin: 8px 0;
`;
