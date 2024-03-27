import useGroups from '@/hooks/useGroups';

import GroupCard from './GroupCard';
import { GroupsStyledContainer } from './styled';

const GroupsContainer = () => {
  const groups = useGroups();

  return (
    <GroupsStyledContainer>
      {groups.map(({ id, data }) => (
        <GroupCard key={id} id={id} data={data} />
      ))}
    </GroupsStyledContainer>
  );
};

export default GroupsContainer;
