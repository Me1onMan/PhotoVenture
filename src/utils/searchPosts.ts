import { TPost } from '@/types';

const searchPosts = (post: Omit<TPost, 'id'>, searchValue: string): boolean => {
  const { title, description, advices } = post;
  const searchRegExp = new RegExp(searchValue, 'g');

  if (title.match(searchRegExp) || description.match(searchRegExp) || advices.match(searchRegExp))
    return true;

  return false;
};

export default searchPosts;
