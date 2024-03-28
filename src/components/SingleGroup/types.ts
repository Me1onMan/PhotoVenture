import { TGroup } from '@/types';

export type TProps = {
  id: string;
  data: Omit<TGroup, 'id'>;
};
