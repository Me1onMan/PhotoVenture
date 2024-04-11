import { FC, MouseEvent, useState } from 'react';

import Button from '../../UI/Button';

import Map from './MapSelect';
import { ModalContainer, ModalWrapper } from './styled';
import { TModalMapProps } from './types';

const ModalMap: FC<TModalMapProps> = ({ closeModal, setLat, setLng }) => {
  const [lngLocal, setLngLocal] = useState<number>(0);
  const [latLocal, setLatLocal] = useState<number>(0);

  const closeOnOutsideClick = (e: MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };

  const handleApply = () => {
    setLat(latLocal);
    setLng(lngLocal);
    closeModal();
  };

  return (
    <ModalWrapper onClick={closeOnOutsideClick}>
      <ModalContainer>
        <h1>Modal window!</h1>
        <Map setLng={setLngLocal} setLat={setLatLocal} />
        <Button onClick={closeModal}>Close</Button>
        <Button onClick={handleApply}>Apply</Button>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default ModalMap;
