import { ReactNode } from 'react';

export type TProps = {
  children: ReactNode;
};

export type TState = {
  isError: boolean;
  error: Error;
};
