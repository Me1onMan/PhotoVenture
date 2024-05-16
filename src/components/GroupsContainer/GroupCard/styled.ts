import styled from 'styled-components';

export const GroupCardContainer = styled.div`
  width: 600px;

  padding: 10px;

  border: 1px solid black;
  border-radius: 10px;
`;

export const TopSection = styled.div`
  display: flex;

  align-items: center;
`;

export const InfoBlock = styled.div`
  height: 100px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 0 10px;
`;

export const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 10px;
`;

export const ButtonContainer = styled.div`
  max-width: 200px;
`;

export const Title = styled.h3``;

export const IconProfile = styled.img`
  height: 100px;
  width: 100px;

  border-radius: 50%;
`;

export const Description = styled.p``;

export const Access = styled.p``;

export const OwnerInfo = styled.div`
  display: flex;
  gap: 12px;

  align-items: center;
`;

export const Owner = styled.p`
  font-size: 20px;
  font-weight: 700;
`;

export const Telegram = styled.p`
  color: gray;
`;

export const Members = styled.p``;
