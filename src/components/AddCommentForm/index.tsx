import { FC, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';

import addCommentToPost from '@/firebase/actions/addCommentToPost';
import { selectActiveUser } from '@/store/slices/activeUserSlice';

import Button from '../UI/Button';
import Input from '../UI/Input';

import { ButtonContainer, FormStyled, InputContainer } from './styled';
import { TProps } from './types';

const AddCommentForm: FC<TProps> = ({ postId, commentsId }) => {
  const { id: authorId } = useSelector(selectActiveUser);
  const [comment, setComment] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addCommentToPost(postId, commentsId, comment, authorId);
    setComment('');
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <InputContainer>
        <Input
          value={comment}
          setValue={setComment}
          name="comment"
          placeholder="Напишите свой комментарий..."
        />
      </InputContainer>
      <ButtonContainer>
        <Button type="submit">Опубликовать</Button>
      </ButtonContainer>
    </FormStyled>
  );
};

export default AddCommentForm;
