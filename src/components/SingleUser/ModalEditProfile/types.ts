import { TUserWOPassword } from '@/types';

type TCurrentUser = {
  id: string;
  data: Omit<TUserWOPassword, 'id'>;
};

export type TModalEditProfileProps = {
  userData: TCurrentUser;
};
