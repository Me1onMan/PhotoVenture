import { FC, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';

import addCommentToPost from '@/firebase/actions/addCommentToPost';
import { selectActiveUser } from '@/store/slices/activeUserSlice';

import Button from '../UI/Button';
import Input from '../UI/Input';

import { TProps } from './types';

const AddCommentForm: FC<TProps> = ({ postId, commentsId }) => {
  const { id: authorId } = useSelector(selectActiveUser);
  const [comment, setComment] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addCommentToPost(postId, commentsId, comment, authorId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={comment}
        setValue={setComment}
        name="comment"
        placeholder="Input your comment..."
      />
      <Button type="submit">Add comment</Button>
    </form>
  );
};

export default AddCommentForm;
