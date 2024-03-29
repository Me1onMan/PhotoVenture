import { TUserWOPassword } from '@/types';

export type TProps = {
  id: string;
  data: Omit<TUserWOPassword, 'id' | 'token'>;
};
