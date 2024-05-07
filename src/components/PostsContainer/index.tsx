import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectFilterOptions } from '@/store/slices/filterOptionsSlice';
// import usePosts from '@/hooks/usePosts';
import searchPosts from '@/utils/searchPosts';

import PostsFilterControl from '../UI/PostsFilterControl';
import Search from '../UI/Search';

import { TPostProps } from './Post/types';
import Post from './Post';
import { Container } from './styled';
import { TPostsContainerProps } from './types';

const PostsContainer: FC<TPostsContainerProps> = ({ posts }) => {
  // const posts = usePosts();
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<TPostProps[]>(posts);
  const { types, emotions, access } = useSelector(selectFilterOptions);

  useEffect(() => {
    let tempPosts = posts;
    tempPosts = tempPosts.filter((post) => searchPosts(post.data, searchValue));
    if (types.length > 0) {
      tempPosts = tempPosts.filter((post) => types.includes(post.data.postType));
    }
    if (emotions.length > 0) {
      tempPosts = tempPosts.filter((post) => emotions.includes(post.data.emotion));
    }
    if (access.length > 0) {
      tempPosts = tempPosts.filter((post) => access.includes(post.data.access));
    }
    setFilteredPosts(tempPosts);
  }, [posts, searchValue, types, emotions, access]);

  return (
    <>
      <Search
        value={searchValue}
        setValue={setSearchValue}
        name="postsSearch"
        placeholder="Search in posts"
      />
      <PostsFilterControl />
      <Container>
        {filteredPosts.length > 0 &&
          filteredPosts.map((post) => <Post key={post.id} id={post.id} data={post.data} />)}
      </Container>
    </>
  );
};

export default PostsContainer;
