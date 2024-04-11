import { TUserWOPassword } from '@/types';

export type TUserCardProps = {
  id: string;
  data: Omit<TUserWOPassword, 'id' | 'token'>;
};
