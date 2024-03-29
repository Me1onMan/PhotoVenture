import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import SingleUser from '@/components/SingleUser';
import { TUserCardProps } from '@/components/UsersContainer/UserCard/types';
import getUser from '@/firebase/actions/getUser';

const UserPage = () => {
  const { userId } = useParams();

  const [user, setUser] = useState<TUserCardProps>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPostData = async () => {
      try {
        setIsLoading(true);
        const loadedUser = await getUser(userId);
        setUser(loadedUser);
      } catch (error) {
        console.log(error);
        throw new Error('Error occured in UserPage useEffect()');
      } finally {
        setIsLoading(false);
      }
    };

    getPostData();
  }, [userId]);

  if (isLoading) return <h1>Loading user...</h1>;

  return (
    <>
      <Navbar />
      <SingleUser id={user.id} data={user.data} />
    </>
  );
};

export default UserPage;
