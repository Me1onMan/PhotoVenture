import { ChangeEvent, FC } from 'react';

import StyledSearch from './styled';
import { TSearchProps } from './types';

const Search: FC<TSearchProps> = ({ value, setValue, name, placeholder = '' }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <StyledSearch value={value} onChange={handleChange} name={name} placeholder={placeholder} />
  );
};

export default Search;
