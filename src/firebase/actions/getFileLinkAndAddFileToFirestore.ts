import { ref, uploadBytes } from 'firebase/storage';

import { TFile } from '@/types';
import compressFile from '@/utils/compressImage';

import { storageImagesRef } from '..';

const getFileLinkAndAddFileToFirestore = async (file: TFile, userId: string) => {
  if (!file) return null;

  const now = new Date();
  const imageId = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}-${now.getHours()}${now.getMinutes()}${now.getSeconds()}:${now.getMilliseconds()}-${userId}-${file.name}`;
  const imageName = imageId;
  const fileRef = ref(storageImagesRef, imageName);

  const compressedFile = await compressFile(file);

  try {
    await uploadBytes(fileRef, compressedFile);
  } catch (error) {
    console.log(error);
    throw new Error('Error occured in getFileLinkAndAddFileToFirestore()');
  }
  return imageName;
};

export default getFileLinkAndAddFileToFirestore;
