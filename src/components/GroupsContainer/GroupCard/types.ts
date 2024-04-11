import { TGroup } from '@/types';

export type TGroupCardProps = {
  id: string;
  data: Omit<TGroup, 'id'>;
};
