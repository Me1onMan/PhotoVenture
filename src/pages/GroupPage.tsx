import { useParams } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import SingleGroup from '@/components/SingleGroup';
import useGroup from '@/hooks/useGroup';

const GroupPage = () => {
  const { groupId } = useParams();

  const [group, isLoading] = useGroup(groupId);

  if (isLoading) return <h1>Loading group...</h1>;

  return (
    <>
      <Navbar />
      <SingleGroup id={group.id} data={group.data} />
    </>
  );
};

export default GroupPage;
