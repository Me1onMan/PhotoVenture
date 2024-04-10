import { FC } from 'react';

import usePostsForUser from '@/hooks/usePostsForUser';

import Post from '../PostsContainer/Post';

import { Login, Telegram, UserContainer } from './styled';
import { TProps } from './types';

const SingleUser: FC<TProps> = ({ id, data }) => {
  const { login, email, telegramLink } = data;
  const [posts, isPostsLoading] = usePostsForUser(id);

  return (
    <UserContainer>
      <p>user id: {id}</p>
      <Login>{login}</Login>
      <Telegram>Telegram: {telegramLink}</Telegram>
      <p>Email: {email}</p>
      <h3>Posts</h3>
      {isPostsLoading && <p>Loading posts...</p>}
      {!isPostsLoading && posts.length === 0 && <p>No posts.</p>}
      <div>
        {!isPostsLoading &&
          posts.length > 0 &&
          posts.map((post) => <Post key={post.id} id={post.id} data={post.data} />)}
      </div>
    </UserContainer>
  );
};

export default SingleUser;
