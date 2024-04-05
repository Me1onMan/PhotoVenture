import { FC, FormEvent, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';

import EMOTIONS from '@/constants/emotions';
import POST_TYPES from '@/constants/postTypes';
import addPostToFirestore from '@/firebase/actions/addPostToFirestore';
import { selectActiveUser } from '@/store/slices/activeUserSlice';
import { TEmotions, TFile, TPostTypes } from '@/types';

import ModalMap from '../ModalMap';
import Button from '../UI/Button';
import MultipleFileInput from '../UI/FilesInput';
import Input from '../UI/Input';
import Select from '../UI/Select';

const modalContainer = document.getElementById('modal');

const AddPostForm: FC = () => {
  const { id: authorId } = useSelector(selectActiveUser);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  // const [photoLinks, setPhotoLinks] = useState<Array<string>>([]);
  const [emotion, setEmotion] = useState<TEmotions>('');
  const [postType, setPostType] = useState<TPostTypes>('');
  const [advices, setAdvices] = useState<string>('');
  const [access, setAccess] = useState<string>('');
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [files, setFiles] = useState<Array<TFile>>([]);
  // const [fileNames, setFileNames] = useState<Array<string>>([]);
  // const [geoCoordinates, setGeoCoordinates] = useState<[number, number]>([0, 0]);

  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const openModalMap = () => {
    setIsShowModal(true);
  };
  const closeModalMap = () => {
    setIsShowModal(false);
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setEmotion('');
    setPostType('');
    setAdvices('');
    setAccess('');
    setLatitude(0);
    setLongitude(0);
    setFiles([]);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addPostToFirestore({
        title,
        description,
        files,
        emotion,
        postType,
        advices,
        access,
        geoCoordinates: [latitude, longitude],
        authorId,
      });
      clearForm();
    } catch (error) {
      console.log(error);
      throw new Error('Error occured in AddPostForm - handleSubmit()');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input value={title} setValue={setTitle} name="title" placeholder="Title" />
      <Input
        value={description}
        setValue={setDescription}
        name="description"
        placeholder="Description"
      />
      <Input value={advices} setValue={setAdvices} name="advices" placeholder="Advices" />
      <Input
        value={latitude}
        setValue={setLatitude}
        name="latitude"
        placeholder="Latitude"
        type="number"
      />
      <Input
        value={longitude}
        setValue={setLongitude}
        name="longitude"
        placeholder="Longitude"
        type="number"
      />
      <Button onClick={openModalMap}>Select on map</Button>
      <Select
        selectedValue={emotion}
        setSelectedValue={setEmotion}
        options={EMOTIONS}
        placeholder="Emotion"
      />
      <Select
        selectedValue={postType}
        setSelectedValue={setPostType}
        options={POST_TYPES}
        placeholder="Post type"
      />
      <Select
        selectedValue={access}
        setSelectedValue={setAccess}
        options={['public', 'private']}
        placeholder="Access"
      />
      <MultipleFileInput files={files} setFiles={setFiles} />
      <Button type="submit" disabled={isLoading}>
        Create post
      </Button>
      {isShowModal &&
        createPortal(
          <ModalMap closeModal={closeModalMap} setLat={setLatitude} setLng={setLongitude} />,
          modalContainer,
        )}
    </form>
  );
};

export default AddPostForm;
