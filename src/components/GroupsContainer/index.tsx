import { useEffect, useState } from 'react';

import useGroups from '@/hooks/useGroups';
import searchGroups from '@/utils/searchGroups';

import Search from '../UI/Search';

import { TGroupCardProps } from './GroupCard/types';
import GroupCard from './GroupCard';
import { GroupsStyledContainer } from './styled';

const GroupsContainer = () => {
  const groups = useGroups();
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredGroups, setFilteredGroups] = useState<TGroupCardProps[]>(groups);

  useEffect(() => {
    setFilteredGroups(groups.filter((group) => searchGroups(group.data, searchValue)));
  }, [groups, searchValue]);

  return (
    <>
      <Search
        value={searchValue}
        setValue={setSearchValue}
        name="groupsSearch"
        placeholder="Search in groups"
      />
      <GroupsStyledContainer>
        {filteredGroups.map(({ id, data }) => (
          <GroupCard key={id} id={id} data={data} />
        ))}
      </GroupsStyledContainer>
    </>
  );
};

export default GroupsContainer;
