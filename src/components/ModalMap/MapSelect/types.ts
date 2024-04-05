import { Dispatch, SetStateAction } from 'react';

export type TMapSelectProps = {
  setLng: Dispatch<SetStateAction<number>>;
  setLat: Dispatch<SetStateAction<number>>;
};
