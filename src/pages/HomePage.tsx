import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/UI/Button';
import { logout } from '@/firebase';
import { LOGIN_PAGE_ROUTE } from '@/router/routes';
import { removeActiveUser } from '@/store/slices/activeUserSlice';

const HomePage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(removeActiveUser());
    logout();
    navigate(LOGIN_PAGE_ROUTE, { replace: true });
  };

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default HomePage;
