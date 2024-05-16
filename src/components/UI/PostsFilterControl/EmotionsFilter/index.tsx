import { useState } from 'react';
import { useSelector } from 'react-redux';

import EMOTIONS from '@/constants/emotions';
import { selectFilterOptions } from '@/store/slices/filterOptionsSlice';

import { ButtonContainer, FilterLabelButton, FiltersContainer } from '../TypesFilter/styled';

import EmotionElement from './EmotionElement';

const EmotionsFilter = () => {
  const { emotions: selectedEmotions } = useSelector(selectFilterOptions);

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (isOpen) setIsOpen(false);
    else setIsOpen(true);
  };

  return (
    <ButtonContainer>
      <FilterLabelButton onClick={handleClick}>Эмоции</FilterLabelButton>
      {isOpen && (
        <FiltersContainer>
          {EMOTIONS.map((emotion) => (
            <EmotionElement
              key={emotion}
              emotion={emotion}
              isSelected={selectedEmotions.includes(emotion)}
            />
          ))}
        </FiltersContainer>
      )}
    </ButtonContainer>
  );
};

export default EmotionsFilter;
