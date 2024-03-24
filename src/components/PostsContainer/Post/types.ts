import { TPost } from '@/types';

export type TPostProps = {
  id: string;
  postData: Omit<TPost, 'id'>;
};
