import { TPost } from '@/types';

export type TProps = {
  id: string;
  data: Omit<TPost, 'id'>;
};
