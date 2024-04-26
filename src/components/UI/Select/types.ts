import { Dispatch, SetStateAction } from 'react';

export type TOption = {
  value: string | number;
  title: string | number;
};

export type TSelectProps = {
  selectedValue: string;
  setSelectedValue: Dispatch<SetStateAction<string>>;
  options: TOption[];
  placeholder: string;
  width?: string;
};

export type TStyledSelectProps = {
  $width: string;
};
