import { useParams } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import SingleUser from '@/components/SingleUser';
import useUser from '@/hooks/useUser';

const UserPage = () => {
  const { userId } = useParams();

  const [user, isUserLoading] = useUser(userId);

  if (isUserLoading) return <h1>Loading user...</h1>;

  return (
    <>
      <Navbar />
      <SingleUser id={user.id} data={user.data} />
    </>
  );
};

export default UserPage;
