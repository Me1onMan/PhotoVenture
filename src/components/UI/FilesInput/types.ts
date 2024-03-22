import { Dispatch, SetStateAction } from 'react';

import { TFile } from '@/types';

export type TProps = {
  files: Array<TFile>;
  setFiles: Dispatch<SetStateAction<Array<TFile>>>;
};
