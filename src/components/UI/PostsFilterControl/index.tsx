import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import getGroups from '@/firebase/actions/getGroups';
import { selectActiveUser } from '@/store/slices/activeUserSlice';

import { TOption } from '../Select/types';

import AccessFilter from './AccessFilter';
import EmotionsFilter from './EmotionsFilter';
import FiltersButtonContainer from './styled';
import TypesFilter from './TypesFilter';

const PostsFilterControl = () => {
  const { id: authorId } = useSelector(selectActiveUser);
  const [groupsOptions, setGroupsOptions] = useState<TOption[]>([]);

  useEffect(() => {
    const getUserGroups = async () => {
      const groups = await getGroups();
      const filteredOptions = groups
        .filter(({ data: { membersId } }) => membersId.includes(authorId))
        .map(({ id, data: { title: groupTitle } }) => ({ value: id, title: groupTitle }));
      setGroupsOptions(filteredOptions);
    };

    getUserGroups();
  }, [authorId]);

  return (
    <FiltersButtonContainer>
      <TypesFilter />
      <EmotionsFilter />
      <AccessFilter groupsOptions={groupsOptions} />
    </FiltersButtonContainer>
  );
};

export default PostsFilterControl;
