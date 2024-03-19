import { FC, ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '@/firebase';
import { setIsAuth } from '@/store/slices/isAuthSlice';

type TProps = {
  children: ReactNode;
};

const IsAuthProvider: FC<TProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(true);
      //   console.log(user);
      dispatch(setIsAuth(!!user));
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return children;
};

export default IsAuthProvider;
