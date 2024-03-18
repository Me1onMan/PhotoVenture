import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { HOME_PAGE_ROUTE, REGISTRATION_PAGE_ROUTE } from '@/router/routes';
import { AppDispatch } from '@/store';
import { fetchUserByLogin } from '@/store/slices/activeUserSlice';

// import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../UI/Button';
import Input from '../UI/Input';

// type TFormInput = {
//   login: string;
//   email: string;
//   telegramLink: string;
//   password: string;
// };

const LoginForm = () => {
  // const {register, handleSubmit} = useForm<TFormInput>();

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // const onSubmit: SubmitHandler<TFormInput> = () => {};
  const handleSubmit = async () => {
    dispatch(fetchUserByLogin({ login, password }));
    navigate(HOME_PAGE_ROUTE);
  };

  return (
    <>
      <h1>Login!</h1>
      <form onSubmit={handleSubmit}>
        <Input value={login} setValue={setLogin} name="login" placeholder="Login" type="text" />
        <Input
          value={password}
          setValue={setPassword}
          name="password"
          placeholder="Password"
          type="password"
        />
        <Button type="button" onClick={handleSubmit}>
          Login
        </Button>
      </form>
      <NavLink to={REGISTRATION_PAGE_ROUTE}>To registration page</NavLink>
    </>
  );
};

export default LoginForm;
