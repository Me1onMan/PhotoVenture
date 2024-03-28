import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { TGroupCardProps } from '@/components/GroupsContainer/GroupCard/types';
import Navbar from '@/components/Navbar';
import SingleGroup from '@/components/SingleGroup';
import getGroup from '@/firebase/actions/getGroup';

const GroupPage = () => {
  const { groupId } = useParams();

  const [group, setGroup] = useState<TGroupCardProps>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPostData = async () => {
      try {
        setIsLoading(true);
        const loadedGroup = await getGroup(groupId);
        setGroup(loadedGroup);
      } catch (error) {
        console.log(error);
        throw new Error('Error occured in SinglePost useEffect()');
      } finally {
        setIsLoading(false);
      }
    };

    getPostData();
  }, [groupId]);

  if (isLoading) return <h1>Loading group...</h1>;

  return (
    <>
      <Navbar />
      <SingleGroup id={group.id} data={group.data} />
    </>
  );
};

export default GroupPage;
