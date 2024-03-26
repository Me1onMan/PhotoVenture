import { FC, useEffect, useState } from 'react';

import getAllPosts from '@/firebase/actions/getPosts';

import { TPostProps } from './Post/types';
import Post from './Post';
import { Container } from './styled';

const PostsContainer: FC = () => {
  const [posts, setPosts] = useState<Array<TPostProps>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        const loadedPosts = await getAllPosts('desc');

        setPosts(loadedPosts);
      } catch (error) {
        throw new Error('Error occured in PostsContainer useEffect');
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (isLoading) return <h1>Loading</h1>;

  return (
    <Container>
      {posts.length > 0 &&
        posts.map((post) => <Post key={post.id} id={post.id} postData={post.postData} />)}
    </Container>
  );
};

export default PostsContainer;
