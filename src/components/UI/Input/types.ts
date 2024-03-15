import { Dispatch, SetStateAction } from 'react';

export type TInputProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  name: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email';
  pattern?: string;
};
