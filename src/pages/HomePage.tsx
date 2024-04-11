import { FC } from 'react';

import AddPostForm from '@/components/AddPostForm';
import Navbar from '@/components/Navbar';
import PostsContainer from '@/components/PostsContainer';

const HomePage: FC = () => {
  return (
    <div>
      <Navbar />
      <AddPostForm />
      <PostsContainer />
    </div>
  );
};

export default HomePage;
