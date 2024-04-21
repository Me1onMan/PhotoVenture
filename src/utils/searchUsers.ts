import { TUserWOPassword } from '@/types';

const searchUsers = (user: Omit<TUserWOPassword, 'id'>, searchValue: string): boolean => {
  const { login, telegramLink, email } = user;
  const searchRegExp = new RegExp(searchValue, 'g');

  if (login.match(searchRegExp) || telegramLink.match(searchRegExp) || email.match(searchRegExp))
    return true;

  return false;
};

export default searchUsers;
