import { TPost } from '@/types';

export type TPostProps = {
  id: string;
  data: Omit<TPost, 'id'>;
};
