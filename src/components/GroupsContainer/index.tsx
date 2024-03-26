import { useEffect, useState } from 'react';

import getGroups from '@/firebase/actions/getGroups';

import { TGroupCardProps } from './GroupCard/types';
import GroupCard from './GroupCard';
import { GroupsStyledContainer } from './styled';

const GroupsContainer = () => {
  const [groups, setGroups] = useState<Array<TGroupCardProps>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        setIsLoading(true);
        const loadedGroups = await getGroups();
        setGroups(loadedGroups);
      } catch (error) {
        console.log(error);
        throw new Error('Error occured in GroupsContainer useEffect()');
      } finally {
        setIsLoading(false);
      }
    };

    loadGroups();
  }, []);

  if (isLoading) return <h1>Loading users...</h1>;

  return (
    <GroupsStyledContainer>
      {groups.map(({ id, data }) => (
        <GroupCard key={id} id={id} data={data} />
      ))}
    </GroupsStyledContainer>
  );
};

export default GroupsContainer;
