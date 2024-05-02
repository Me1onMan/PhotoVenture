import { Dispatch, SetStateAction } from 'react';

export type TSearchProps = {
  value: string | number;
  setValue: Dispatch<SetStateAction<string | number>>;
  name: string;
  placeholder: string;
};
