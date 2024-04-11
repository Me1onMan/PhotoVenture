import { FC } from 'react';

import usePosts from '@/hooks/usePosts';

import Post from './Post';
import { Container } from './styled';

const PostsContainer: FC = () => {
  const posts = usePosts();

  return (
    <Container>
      {posts.length > 0 &&
        posts.map((post) => <Post key={post.id} id={post.id} data={post.data} />)}
    </Container>
  );
};

export default PostsContainer;
