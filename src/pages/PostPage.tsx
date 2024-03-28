import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import { TPostProps } from '@/components/PostsContainer/Post/types';
import SinglePost from '@/components/SinglePost';
import getSinglePost from '@/firebase/actions/getSinglePost';

const PostPage = () => {
  const { postId } = useParams();

  const [post, setPost] = useState<TPostProps>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPostData = async () => {
      try {
        setIsLoading(true);
        const loadedPost = await getSinglePost(postId);
        setPost(loadedPost);
      } catch (error) {
        console.log(error);
        throw new Error('Error occured in SinglePost useEffect()');
      } finally {
        setIsLoading(false);
      }
    };

    getPostData();
  }, [postId]);

  if (isLoading) return <h1>Loading post...</h1>;
  console.log(post.data);

  return (
    <>
      <Navbar />
      <SinglePost id={post.id} data={post.data} />
    </>
  );
};

export default PostPage;
