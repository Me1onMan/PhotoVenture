import { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectFilterOptions } from '@/store/slices/filterOptionsSlice';

import { ButtonContainer, FilterLabelButton, FiltersContainer } from '../TypesFilter/styled';

import AccessElement from './AccessElement';
import { TProps } from './types';

const AccessFilter: FC<TProps> = ({ groupsOptions }) => {
  const { access: selectedAccess } = useSelector(selectFilterOptions);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (isOpen) setIsOpen(false);
    else setIsOpen(true);
  };

  return (
    <ButtonContainer>
      <FilterLabelButton onClick={handleClick}>Доступ</FilterLabelButton>
      {isOpen && (
        <FiltersContainer>
          <AccessElement
            groupId="public"
            groupName="Открытая"
            isSelected={selectedAccess.includes('public')}
          />
          <AccessElement
            groupId="private"
            groupName="Закрытая"
            isSelected={selectedAccess.includes('private')}
          />
          {groupsOptions.map(({ value, title }) => (
            <AccessElement
              key={value}
              groupId={value}
              groupName={title}
              isSelected={selectedAccess.includes(value)}
            />
          ))}
        </FiltersContainer>
      )}
    </ButtonContainer>
  );
};

export default AccessFilter;
