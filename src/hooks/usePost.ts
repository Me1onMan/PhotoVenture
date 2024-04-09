import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';

import { TPostProps } from '@/components/PostsContainer/Post/types';
import { database } from '@/firebase';
import { POSTS_COLLECTION } from '@/firebase/collections';

const usePost = (postId: string): [TPostProps, boolean] => {
  const [posts, setPosts] = useState<TPostProps>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onSnapshot(doc(database, POSTS_COLLECTION, postId), (querySnapshot) => {
      const docSnapshot = {
        id: querySnapshot.id,
        data: querySnapshot.data(),
      } as TPostProps;

      setPosts(docSnapshot);
      setIsLoading(false);
    });

    return unsubscribe;
  }, [postId]);

  return [posts, isLoading];
};

export default usePost;
