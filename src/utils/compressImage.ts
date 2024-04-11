import Compressor from 'compressorjs';

import { TFile } from '../types';

const compressFile = (file: TFile): Promise<Blob> => {
  const nonNullableFile = file! as Blob;
  return new Promise((resolve, reject) => {
    new Compressor(nonNullableFile, {
      quality: 0.7,
      maxWidth: 700,
      success(result) {
        resolve(result);
      },
      error(error) {
        reject(error);
      },
    });
  });
};

export default compressFile;
