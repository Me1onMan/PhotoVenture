import { Dispatch, SetStateAction } from 'react';

import { TFile } from '@/types';

export type TProps = {
  file: TFile;
  setFile: Dispatch<SetStateAction<TFile>>;
};
