import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  justify-content: center;
  gap: 20px;
`;

export const UserCardContainer = styled.div`
  width: 800px;
  height: 100px;

  padding: 10px;

  display: grid;
  grid-template-columns: 80px 1fr 1fr;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  border: 1px solid black;
  border-radius: 10px;
`;

export const IconProfile = styled.img`
  height: 80px;
  width: 80px;

  border-radius: 50%;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Login = styled.h1``;

export const Telegram = styled.p`
  color: gray;
`;

export const EditButtonContainer = styled.div`
  max-width: 200px;
  justify-self: flex-end;
`;

export const PostsTitle = styled.h2`
  font-size: 40px;
`;
