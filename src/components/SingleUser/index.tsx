import { FC, useEffect, useState } from 'react';

import getPostsByAuthorId from '@/firebase/actions/getPostsByAuthorId';

import Post from '../PostsContainer/Post';
import { TPostProps } from '../PostsContainer/Post/types';

import { Login, Telegram, UserContainer } from './styled';
import { TProps } from './types';

const SingleUser: FC<TProps> = ({ id, data }) => {
  const { login, email, telegramLink } = data;
  const [posts, setPosts] = useState<TPostProps[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const loadedPosts = await getPostsByAuthorId(id);
        setPosts(loadedPosts);
      } catch (error) {
        throw new Error(error);
      }
    };

    loadPosts();
  }, [id]);

  return (
    <UserContainer>
      <p>user id: {id}</p>
      <Login>{login}</Login>
      <Telegram>Telegram: {telegramLink}</Telegram>
      <p>Email: {email}</p>
      <h3>Posts</h3>
      <div>
        {posts.length > 0 &&
          posts.map((post) => <Post key={post.id} id={post.id} data={post.data} />)}
      </div>
    </UserContainer>
  );
};

export default SingleUser;
