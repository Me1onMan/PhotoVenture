import { TGroup } from '@/types';

const searchGroups = (user: Omit<TGroup, 'id'>, searchValue: string): boolean => {
  const { title, description } = user;
  const searchRegExp = new RegExp(searchValue, 'g');

  if (title.match(searchRegExp) || description.match(searchRegExp)) return true;

  return false;
};

export default searchGroups;
