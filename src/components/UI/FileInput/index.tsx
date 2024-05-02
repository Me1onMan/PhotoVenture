import { ChangeEvent, FC } from 'react';

import { TProps } from './types';

const FileInput: FC<TProps> = ({ file, setFile }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files[0]);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  // console.log(files);

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} accept="image/*" />
      <div>
        {file && (
          <div key={file.name}>
            <span>{file.name}</span>
            <button type="button" onClick={handleRemoveFile}>
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileInput;
