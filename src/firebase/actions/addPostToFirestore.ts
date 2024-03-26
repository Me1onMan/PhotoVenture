import { addDoc, collection } from 'firebase/firestore';

import { TPostCreate } from '@/types';

import { POSTS_COLLECTION } from '../collections';
import { database } from '..';

import getFileLinkAndAddFileToFirestore from './getFileLinkAndAddFileToFirestore';

const addPostToFirestore = async ({
  title,
  description,
  files,
  emotion,
  postType,
  advices,
  access,
  authorId,
  geoCoordinates,
}: TPostCreate) => {
  try {
    const getImageLinks = async () => {
      const promises = files.map(async (file) => {
        const imageLink = await getFileLinkAndAddFileToFirestore(file, authorId);
        return imageLink;
      });

      const imageLinks = await Promise.all(promises);

      return imageLinks;
    };

    const imageLinks = await getImageLinks();

    await addDoc(collection(database, POSTS_COLLECTION), {
      title,
      description,
      photoLinks: imageLinks,
      emotion,
      postType,
      advices,
      access,
      authorId,
      geoCoordinates,
      createdAt: new Date(),
      commentsId: [],
    });
  } catch (error) {
    console.log(error);
    throw new Error('Error occured in addPostToFirestore()');
  }
};

export default addPostToFirestore;
