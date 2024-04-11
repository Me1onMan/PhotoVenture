import { FC, ReactNode } from 'react';

export type TRoute = {
  path: string;
  element: FC;
  errorElement?: ReactNode;
};
