import { useEffect, useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';

import { storageImagesRef } from '@/firebase';

const usePhotoFromFirestore = (photoLink: string) => {
  const [photo, setPhoto] = useState<string>('');

  useEffect(() => {
    const getFile = async () => {
      const downloadedFile = await getDownloadURL(ref(storageImagesRef, photoLink));

      // const downloadedFile = await filePromise;
      setPhoto(downloadedFile);
    };

    getFile();
  }, [photoLink]);

  return photo;
};

export default usePhotoFromFirestore;
