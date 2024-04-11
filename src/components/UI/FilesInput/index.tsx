import { FC } from 'react';

import { TProps } from './types';

const MultipleFileInput: FC<TProps> = ({ files, setFiles }) => {
  // const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const fileList = event.target.files;
    const newFiles = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < fileList.length; i++) {
      newFiles.push(fileList[i]);
    }

    setFiles([...files, ...newFiles]);
  };

  const handleRemoveFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  // console.log(files);

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <div>
        {files.map((file, index) => (
          <div key={file.name}>
            <span>{file.name}</span>
            <button type="button" onClick={() => handleRemoveFile(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleFileInput;
