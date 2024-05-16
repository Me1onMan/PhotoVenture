import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-gap: 10px;

  margin-top: 20px;

  justify-content: center;
`;

export const PostContainer = styled.div`
  width: 800px;

  padding: 1rem;

  border: 1px solid black;
  border-radius: 16px;
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

export const Title = styled.h2`
  margin-top: 8px;
`;

export const FilterSection = styled.div`
  display: flex;
  gap: 20px;

  margin-top: 4px;
`;

export const PostType = styled.p``;

export const Emotion = styled.p``;

export const PhotosContainer = styled.div`
  margin-top: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const Description = styled.p`
  margin: 12px 0;
`;

export const Advices = styled.p``;

export const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 8px;
`;

export const Access = styled.p``;

export const GeoCoordinates = styled.p``;

export const LikeButton = styled.button`
  display: flex;
  gap: 4px;
  align-items: center;

  background: none;
  border: none;
`;

export const LikeIcon = styled.img`
  width: 32px;
`;
