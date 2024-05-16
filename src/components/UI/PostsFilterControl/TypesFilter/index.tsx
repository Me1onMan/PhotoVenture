import { useState } from 'react';
import { useSelector } from 'react-redux';

import POST_TYPES from '@/constants/postTypes';
import { selectFilterOptions } from '@/store/slices/filterOptionsSlice';

import { ButtonContainer, FilterLabelButton, FiltersContainer } from './styled';
import TypeElement from './TypeElement';

const TypesFilter = () => {
  const { types: selectedTypes } = useSelector(selectFilterOptions);

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (isOpen) setIsOpen(false);
    else setIsOpen(true);
  };

  return (
    <ButtonContainer>
      <FilterLabelButton onClick={handleClick}>Типы</FilterLabelButton>
      {isOpen && (
        <FiltersContainer>
          {POST_TYPES.map((postType) => (
            <TypeElement
              key={postType}
              postType={postType}
              isSelected={selectedTypes.includes(postType)}
            />
          ))}
        </FiltersContainer>
      )}
    </ButtonContainer>
  );
};

export default TypesFilter;
