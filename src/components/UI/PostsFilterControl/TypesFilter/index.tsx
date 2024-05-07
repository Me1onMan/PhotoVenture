import POST_TYPES from '@/constants/postTypes';

import TypeElement from './TypeElement';

const TypesFilter = () => {
  return (
    <div>
      {POST_TYPES.map((postType) => (
        <TypeElement key={postType} postType={postType} />
      ))}
    </div>
  );
};

export default TypesFilter;
