import { FC, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';

import addGroupToFirestore from '@/firebase/actions/addGroupToFirestore';
import getFileLinkAndAddFileToFirestore from '@/firebase/actions/getFileLinkAndAddFileToFirestore';
import { selectActiveUser } from '@/store/slices/activeUserSlice';
import { TFile } from '@/types';

import Button from '../UI/Button';
import FileInput from '../UI/FileInput';
import Input from '../UI/Input';
import Select from '../UI/Select';

import FormStyled from './styled';

const AddGroupForm: FC = () => {
  const { id: ownerId } = useSelector(selectActiveUser);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [access, setAccess] = useState<'public' | 'private'>('public');
  const [file, setFile] = useState<TFile>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setAccess('public');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const isPhotoLoaded = !!file;

    try {
      if (isPhotoLoaded) {
        const photoLink = await getFileLinkAndAddFileToFirestore(file, ownerId);
        await addGroupToFirestore({ title, description, access, ownerId, photoLink });
      } else {
        const photoLink = '';
        await addGroupToFirestore({ title, description, access, ownerId, photoLink });
      }
      clearForm();
    } catch (error) {
      console.log(error);
      throw new Error('Error occured in AddGroupForm - handleSubmit()');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <Input value={title} setValue={setTitle} name="title" placeholder="Название" />
      <Input
        value={description}
        setValue={setDescription}
        name="description"
        placeholder="Описание"
      />
      <Select
        selectedValue={access}
        setSelectedValue={setAccess}
        options={[
          { value: 'public', title: 'Открытая' },
          { value: 'private', title: 'Закрытая' },
        ]}
        placeholder="Доступ"
      />
      <FileInput file={file} setFile={setFile} />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Создаём...' : 'Создать'}
      </Button>
    </FormStyled>
  );
};

export default AddGroupForm;
