import { TComment } from '@/types';

export type TCommentProps = {
  id: string;
  data: Omit<TComment, 'id'>;
};
