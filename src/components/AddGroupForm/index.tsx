import { FC, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';

import addGroupToFirestore from '@/firebase/actions/addGroupToFirestore';
import { selectActiveUser } from '@/store/slices/activeUserSlice';

import Button from '../UI/Button';
import Input from '../UI/Input';
import Select from '../UI/Select';

const AddGroupForm: FC = () => {
  const { id: ownerId } = useSelector(selectActiveUser);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [access, setAccess] = useState<'public' | 'private'>('public');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setAccess('public');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      addGroupToFirestore({ title, description, access, ownerId });
      clearForm();
    } catch (error) {
      console.log(error);
      throw new Error('Error occured in AddGroupForm - handleSubmit()');
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
      <Select
        selectedValue={access}
        setSelectedValue={setAccess}
        options={['public', 'private']}
        placeholder="Access"
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create group'}
      </Button>
    </form>
  );
};

export default AddGroupForm;
