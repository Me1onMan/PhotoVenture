import { FC, FormEvent, MouseEvent, useState } from 'react';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import { auth } from '@/firebase';
import updateUserDB from '@/firebase/actions/updateUserDB';

import { ModalContainer, ModalWrapper } from './styled';
import { TModalEditProfileProps } from './types';

const ModalEditProfile: FC<TModalEditProfileProps> = ({ closeModal, userData }) => {
  const {
    id: userId,
    data: { login, email, telegramLink },
  } = userData;

  const [newLogin, setNewLogin] = useState<string>(login);
  const [newEmail, setNewEmail] = useState<string>(email);
  const [newTelegramLink, setNewTelegramLink] = useState<string>(telegramLink);
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  const closeOnOutsideClick = (e: MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };

  const clearPasswordInputs = () => {
    setOldPassword('');
    setNewPassword('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmailChanged = newEmail !== email && newEmail !== '';
    const isNewPasswordEntered = !!newPassword;

    if (!isEmailChanged && !isNewPasswordEntered) {
      const isLoginChanged = newLogin !== login && newLogin !== '';
      const isTelegramChanged = newTelegramLink !== telegramLink && newTelegramLink !== '';

      if (isLoginChanged || isTelegramChanged) {
        await updateUserDB(userId, newLogin, newTelegramLink);
        return;
      }
    }

    const user = auth.currentUser;
    if (!user) return;

    const credential = EmailAuthProvider.credential(email, oldPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      if (isNewPasswordEntered) {
        await updatePassword(user, newPassword);
        // const newCredential = EmailAuthProvider.credential(email, newPassword);
        // await reauthenticateWithCredential(user, newCredential);
      }
      //   if (isEmailChanged) {
      //     await updateEmail(user, newEmail);
      //     console.log('Email was updated!');
      //   }

      const isLoginChanged = newLogin !== login && newLogin !== '';
      const isTelegramChanged = newTelegramLink !== telegramLink && newTelegramLink !== '';

      if (isLoginChanged || isTelegramChanged) {
        await updateUserDB(userId, newLogin, newTelegramLink);
      }
    } catch (error) {
      throw new Error(`Error occured while updating password: ${error}`);
    } finally {
      clearPasswordInputs();
    }
  };

  return (
    <ModalWrapper onClick={closeOnOutsideClick}>
      <ModalContainer>
        <h1>Edit profile</h1>
        <form onSubmit={handleSubmit}>
          <Input
            value={newLogin}
            setValue={setNewLogin}
            placeholder="Your login"
            name="login"
            type="text"
          />
          <Input
            value={newEmail}
            setValue={setNewEmail}
            placeholder="Your email"
            name="email"
            type="email"
          />
          <Input
            value={newTelegramLink}
            setValue={setNewTelegramLink}
            placeholder="Your telegram login"
            name="telegram"
            type="text"
          />
          <Input
            value={oldPassword}
            setValue={setOldPassword}
            placeholder="Old password"
            name="oldPassword"
            type="password"
          />
          <Input
            value={newPassword}
            setValue={setNewPassword}
            placeholder="New password"
            name="newPassword"
            type="password"
          />
          <Button type="submit">Update</Button>
          <Button onClick={closeModal}>Close</Button>
        </form>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default ModalEditProfile;
