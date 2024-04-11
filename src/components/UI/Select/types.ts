import { Dispatch, SetStateAction } from 'react';

export type TSelectProps = {
  selectedValue: string;
  setSelectedValue: Dispatch<SetStateAction<string>>;
  options: string[] | number[];
  placeholder: string;
  width?: string;
};

export type TStyledSelectProps = {
  $width: string;
};
