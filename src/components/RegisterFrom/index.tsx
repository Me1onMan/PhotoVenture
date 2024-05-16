import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import register from '@/firebase/actions/register';
import { LOGIN_PAGE_ROUTE } from '@/router/routes';
import isRegisterDataUnique from '@/utils/isRegisterDataUnique';

// import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../UI/Button';
import Input from '../UI/Input';

import { Container, FormStyled, RegisterHeader } from './styled';

// type TFormInput = {
//   login: string;
//   email: string;
//   telegramLink: string;
//   password: string;
// };

const RegisterForm = () => {
  const dispatch = useDispatch();
  // const {register, handleSubmit} = useForm<TFormInput>();

  const [login, setLogin] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [telegramLink, setTelegramLink] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // const onSubmit: SubmitHandler<TFormInput> = () => {};
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (await isRegisterDataUnique(login, email)) {
      await register({ login, email, telegramLink, password }, dispatch);
    }
  };

  return (
    <Container>
      <RegisterHeader>Registration!</RegisterHeader>
      <FormStyled onSubmit={handleSubmit}>
        <Input value={login} setValue={setLogin} name="login" placeholder="Login" type="text" />
        <Input value={email} setValue={setEmail} name="email" placeholder="Email" type="email" />
        <Input
          value={telegramLink}
          setValue={setTelegramLink}
          name="telegramLink"
          placeholder="Telegram link"
          type="text"
        />
        <Input
          value={password}
          setValue={setPassword}
          name="password"
          placeholder="Password"
          type="password"
        />
        <Button type="submit">Register</Button>
      </FormStyled>
      <NavLink to={LOGIN_PAGE_ROUTE}>To login page</NavLink>
    </Container>
  );
};

export default RegisterForm;
