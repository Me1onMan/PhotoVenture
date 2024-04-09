import { Dispatch, SetStateAction } from 'react';

export type TModalMapProps = {
  closeModal: () => void;
  setLng: Dispatch<SetStateAction<number>>;
  setLat: Dispatch<SetStateAction<number>>;
};
