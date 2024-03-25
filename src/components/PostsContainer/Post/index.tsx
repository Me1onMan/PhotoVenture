import { FC, useEffect, useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';

import { storageImagesRef } from '@/firebase';

import {
  Access,
  Advices,
  Author,
  CreatedAt,
  Description,
  Emotion,
  GeoCoordinates,
  PostContainer,
  PostType,
  Title,
} from './styled';
import { TPostProps } from './types';

const Post: FC<TPostProps> = ({ id, postData }) => {
  //   if (!postData) return null;
  const {
    title,
    description,
    photoLinks,
    emotion,
    postType,
    advices,
    access,
    authorId,
    geoCoordinates,
    createdAt,
    commentsId,
  } = postData;
  const creationDate = createdAt.toDate().toString();

  const [photos, setPhotos] = useState<Array<string>>([]);

  useEffect(() => {
    const getFile = async () => {
      const filePromises = photoLinks.map(async (photoLink) => {
        const file = await getDownloadURL(ref(storageImagesRef, photoLink));
        return file;
      });
      //   const file = await getDownloadURL(ref(storageImagesRef, photoLinks[0]));
      const downloadedFiles = await Promise.all(filePromises);
      setPhotos(downloadedFiles);
    };

    getFile();
  }, [photoLinks]);
  //   console.log(creationDate);

  //   console.log(id);
  //   console.log(photoLinks);
  console.log(commentsId);

  return (
    <PostContainer>
      <Title>{title}</Title>
      <p>id: {id}</p>
      {photos.length && photos.map((photo) => <img key={photo} src={photo} alt="Post file" />)}
      <Description>{description}</Description>
      <Emotion>{emotion}</Emotion>
      <PostType>{postType}</PostType>
      <Advices>{advices}</Advices>
      <Access>{access}</Access>
      <GeoCoordinates>{geoCoordinates}</GeoCoordinates>
      <CreatedAt>{creationDate}</CreatedAt>
      <Author>{authorId}</Author>
    </PostContainer>
  );
};

export default Post;
