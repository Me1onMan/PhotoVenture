import { ChangeEvent, FC } from 'react';

import { Option, StyledSelect, StyledSelectContainer } from './styled';
import { TSelectProps } from './types';

const Select: FC<TSelectProps> = ({
  selectedValue,
  setSelectedValue,
  options = [],
  placeholder = '',
}) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  return (
    <StyledSelectContainer>
      <StyledSelect value={selectedValue} onChange={handleChange}>
        <Option value="" disabled>
          {placeholder}
        </Option>
        {options.map((option) => (
          <Option value={option} key={option}>
            {option}
          </Option>
        ))}
      </StyledSelect>
    </StyledSelectContainer>
  );
};

export default Select;
