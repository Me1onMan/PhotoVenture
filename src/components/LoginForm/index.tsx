import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { POSTS_PAGE_ROUTE, REGISTRATION_PAGE_ROUTE } from '@/router/routes';
import { AppDispatch } from '@/store';
import { fetchUserByLogin } from '@/store/slices/activeUserSlice';

// import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../UI/Button';
import Input from '../UI/Input';

import { FormStyled, HeaderLogin, LoginContainer } from './styled';

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
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(fetchUserByLogin({ login, password }));
    navigate(POSTS_PAGE_ROUTE);
  };

  return (
    <LoginContainer>
      <HeaderLogin>Login!</HeaderLogin>
      <FormStyled onSubmit={handleSubmit}>
        <Input value={login} setValue={setLogin} name="login" placeholder="Login" type="text" />
        <Input
          value={password}
          setValue={setPassword}
          name="password"
          placeholder="Password"
          type="password"
        />
        <Button type="submit">Login</Button>
      </FormStyled>
      <NavLink to={REGISTRATION_PAGE_ROUTE}>To registration page</NavLink>
    </LoginContainer>
  );
};

export default LoginForm;
