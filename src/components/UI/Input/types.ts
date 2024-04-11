import { Dispatch, SetStateAction } from 'react';

export type TInputProps = {
  value: string | number;
  setValue: Dispatch<SetStateAction<string | number>>;
  name: string;
  placeholder: string;
  type?: 'text' | 'password' | 'email' | 'number';
  pattern?: string;
};
