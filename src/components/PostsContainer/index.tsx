import { FC, useEffect, useState } from 'react';

// import usePosts from '@/hooks/usePosts';
import searchPosts from '@/utils/searchPosts';

import Search from '../UI/Search';

import { TPostProps } from './Post/types';
import Post from './Post';
import { Container } from './styled';
import { TPostsContainerProps } from './types';

const PostsContainer: FC<TPostsContainerProps> = ({ posts }) => {
  // const posts = usePosts();
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<TPostProps[]>(posts);

  useEffect(() => {
    setFilteredPosts(posts.filter((post) => searchPosts(post.data, searchValue)));
  }, [posts, searchValue]);

  return (
    <>
      <Search
        value={searchValue}
        setValue={setSearchValue}
        name="postsSearch"
        placeholder="Search in posts"
      />
      <Container>
        {filteredPosts.length > 0 &&
          filteredPosts.map((post) => <Post key={post.id} id={post.id} data={post.data} />)}
      </Container>
    </>
  );
};

export default PostsContainer;
