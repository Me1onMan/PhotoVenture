import { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';

import { TPostProps } from '@/components/PostsContainer/Post/types';
import { database } from '@/firebase';
import { POSTS_COLLECTION } from '@/firebase/collections';

const usePosts = () => {
  const [posts, setPosts] = useState<Array<TPostProps>>([]);

  useEffect(() => {
    const q = query(collection(database, POSTS_COLLECTION));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docsSnapshot = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            data: doc.data(),
          }) as TPostProps,
      );

      setPosts(docsSnapshot);
    });

    return unsubscribe;
  }, []);

  return posts;
};

export default usePosts;
