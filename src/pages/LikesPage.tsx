import { FC } from 'react';
import { useSelector } from 'react-redux';

import Navbar from '@/components/Navbar';
import PostsContainer from '@/components/PostsContainer';
import useLikedPosts from '@/hooks/useLikedPosts';
import { selectActiveUser } from '@/store/slices/activeUserSlice';

const LikesPage: FC = () => {
  const { id: userId } = useSelector(selectActiveUser);
  const likedPosts = useLikedPosts(userId);

  return (
    <>
      <Navbar />
      <PostsContainer posts={likedPosts} />
    </>
  );
};

export default LikesPage;
