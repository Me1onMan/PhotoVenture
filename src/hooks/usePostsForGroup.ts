import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

import { TPostProps } from '@/components/PostsContainer/Post/types';
import { database } from '@/firebase';
import { POSTS_COLLECTION } from '@/firebase/collections';

const usePostsForGroup = (groupId: string): [TPostProps[], boolean] => {
  const [posts, setPosts] = useState<Array<TPostProps>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const q = query(collection(database, POSTS_COLLECTION), where('access', '==', groupId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docsSnapshot = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            data: doc.data(),
          }) as TPostProps,
      );

      setPosts(docsSnapshot);
      setIsLoading(false);
    });

    return unsubscribe;
  }, [groupId]);

  return [posts, isLoading];
};

export default usePostsForGroup;
