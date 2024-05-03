import { useEffect, useState } from 'react';

import { TPostProps } from '@/components/PostsContainer/Post/types';

import usePosts from './usePosts';

const useLikedPosts = (userId: string): TPostProps[] => {
  const posts = usePosts();
  const [filteredPosts, setFilteredPosts] = useState<TPostProps[]>(posts);

  useEffect(() => {
    setFilteredPosts(posts.filter((post) => post.data.likedByIds.includes(userId)));
  }, [posts, userId]);

  return filteredPosts;
};

export default useLikedPosts;
