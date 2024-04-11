import { useEffect, useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';

import { storageImagesRef } from '@/firebase';

const usePhotosFromFirestore = (photoLinks: Array<string>) => {
  const [photos, setPhotos] = useState<Array<string>>([]);

  useEffect(() => {
    const getFile = async () => {
      const filePromises = photoLinks.map(async (photoLink) => {
        const file = await getDownloadURL(ref(storageImagesRef, photoLink));
        return file;
      });

      const downloadedFiles = await Promise.all(filePromises);
      setPhotos(downloadedFiles);
    };

    getFile();
  }, [photoLinks]);

  return photos;
};

export default usePhotosFromFirestore;
