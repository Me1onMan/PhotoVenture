import { useEffect, useState } from 'react';

import useGroups from '@/hooks/useGroups';
import searchGroups from '@/utils/searchGroups';

import Search from '../UI/Search';

import { TGroupCardProps } from './GroupCard/types';
import GroupCard from './GroupCard';
import { Container, SearchSection } from './styled';

const GroupsContainer = () => {
  const groups = useGroups();
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredGroups, setFilteredGroups] = useState<TGroupCardProps[]>(groups);

  useEffect(() => {
    setFilteredGroups(groups.filter((group) => searchGroups(group.data, searchValue)));
  }, [groups, searchValue]);

  return (
    <>
      <SearchSection>
        <Search
          value={searchValue}
          setValue={setSearchValue}
          name="groupsSearch"
          placeholder="Искать по группам"
        />
      </SearchSection>
      <Container>
        {filteredGroups.map(({ id, data }) => (
          <GroupCard key={id} id={id} data={data} />
        ))}
      </Container>
    </>
  );
};

export default GroupsContainer;
