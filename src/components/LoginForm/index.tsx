import { useState } from 'react';

import getUserIdAndLogin from '@/firebase/actions/getUserIdAndLogin';

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

  // const onSubmit: SubmitHandler<TFormInput> = () => {};
  const handleSubmit = async () => {
    const userData = await getUserIdAndLogin(login, password);
    console.log(userData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login!</h1>
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
  );
};

export default LoginForm;
