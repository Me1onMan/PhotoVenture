import { FC, FormEvent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';

import EMOTIONS from '@/constants/emotions';
import POST_TYPES from '@/constants/postTypes';
import addPostToFirestore from '@/firebase/actions/addPostToFirestore';
import getGroups from '@/firebase/actions/getGroups';
import { selectActiveUser } from '@/store/slices/activeUserSlice';
import { TEmotions, TFile, TPostTypes } from '@/types';

import Button from '../UI/Button';
import MultipleFileInput from '../UI/FilesInput';
import Input from '../UI/Input';
import Select from '../UI/Select';
import { TOption } from '../UI/Select/types';

import ModalMap from './ModalMap';
import { CoordinatesContainer, FormStyled, SelectContainer } from './styled';

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

  const [groupsOptions, setGroupsOptions] = useState<TOption[]>([]);

  useEffect(() => {
    const getUserGroups = async () => {
      const groups = await getGroups();
      const filteredOptions = groups
        .filter(({ data: { membersId } }) => membersId.includes(authorId))
        .map(({ id, data: { title: groupTitle } }) => ({ value: id, title: groupTitle }));
      setGroupsOptions(filteredOptions);
    };

    getUserGroups();
  }, [authorId]);

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
        geoCoordinates: [longitude, latitude],
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
    <FormStyled onSubmit={handleSubmit}>
      <Input value={title} setValue={setTitle} name="title" placeholder="Заголовок" />
      <Input
        value={description}
        setValue={setDescription}
        name="description"
        placeholder="Описание"
      />
      <Input value={advices} setValue={setAdvices} name="advices" placeholder="Советы" />
      <SelectContainer>
        <Select
          selectedValue={emotion}
          setSelectedValue={setEmotion}
          options={EMOTIONS.map((emotionEl) => ({ value: emotionEl, title: emotionEl }))}
          placeholder="Эмоция"
        />
        <Select
          selectedValue={postType}
          setSelectedValue={setPostType}
          options={POST_TYPES.map((typeEl) => ({ value: typeEl, title: typeEl }))}
          placeholder="Тип записи"
        />
        <Select
          selectedValue={access}
          setSelectedValue={setAccess}
          options={[
            { value: 'public', title: 'public' },
            { value: 'private', title: 'private' },
            ...groupsOptions,
          ]}
          placeholder="Доступ"
        />
      </SelectContainer>
      <CoordinatesContainer>
        <Input
          value={latitude}
          setValue={setLatitude}
          name="latitude"
          placeholder="Широта"
          type="number"
        />
        <Input
          value={longitude}
          setValue={setLongitude}
          name="longitude"
          placeholder="Долгота"
          type="number"
        />
        <Button onClick={openModalMap}>На карте</Button>
      </CoordinatesContainer>
      <MultipleFileInput files={files} setFiles={setFiles} />
      <Button type="submit" disabled={isLoading}>
        Создать публикацию
      </Button>
      {isShowModal &&
        createPortal(
          <ModalMap closeModal={closeModalMap} setLat={setLatitude} setLng={setLongitude} />,
          modalContainer,
        )}
    </FormStyled>
  );
};

export default AddPostForm;
