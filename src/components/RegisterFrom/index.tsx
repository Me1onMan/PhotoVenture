import { useState } from 'react';

import register from '@/firebase/actions/register';

// import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../UI/Button';
import Input from '../UI/Input';

// type TFormInput = {
//   login: string;
//   email: string;
//   telegramLink: string;
//   password: string;
// };

const RegisterForm = () => {
  // const {register, handleSubmit} = useForm<TFormInput>();

  const [login, setLogin] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [telegramLink, setTelegramLink] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // const onSubmit: SubmitHandler<TFormInput> = () => {};
  const handleSubmit = () => {
    register({ login, email, telegramLink, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Registration!</h1>
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
      <Button type="button" onClick={handleSubmit}>
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
