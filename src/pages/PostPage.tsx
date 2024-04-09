import { useParams } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import SinglePost from '@/components/SinglePost';
import usePost from '@/hooks/usePost';

const PostPage = () => {
  const { postId } = useParams();

  const [post, isPostLoading] = usePost(postId);

  if (isPostLoading) return <h1>Loading post...</h1>;

  return (
    <>
      <Navbar />
      <SinglePost id={post.id} data={post.data} />
    </>
  );
};

export default PostPage;
