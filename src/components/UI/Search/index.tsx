import { ChangeEvent, FC } from 'react';

import { ClearButton, StyledSearch, Wrapper } from './styled';
import { TSearchProps } from './types';

const Search: FC<TSearchProps> = ({ value, setValue, name, placeholder = '' }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue('');
  };

  return (
    <Wrapper>
      <StyledSearch value={value} onChange={handleChange} name={name} placeholder={placeholder} />
      {value && <ClearButton onClick={handleClear}>X</ClearButton>}
    </Wrapper>
  );
};

export default Search;
