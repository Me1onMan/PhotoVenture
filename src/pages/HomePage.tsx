import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AddPostForm from '@/components/AddPostForm';
import PostsContainer from '@/components/PostsContainer';
import Button from '@/components/UI/Button';
import { logout } from '@/firebase';
import { LOGIN_PAGE_ROUTE } from '@/router/routes';
import { removeActiveUser } from '@/store/slices/activeUserSlice';

const HomePage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    dispatch(removeActiveUser());
    navigate(LOGIN_PAGE_ROUTE, { replace: true });
  };

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
      <AddPostForm />
      <PostsContainer />
    </div>
  );
};

export default HomePage;
