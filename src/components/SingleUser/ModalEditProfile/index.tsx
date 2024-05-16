import { FC, FormEvent, useState } from 'react';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { deleteObject, ref } from 'firebase/storage';

import Button from '@/components/UI/Button';
import FileInput from '@/components/UI/FileInput';
import Input from '@/components/UI/Input';
import { auth, storage } from '@/firebase';
import getFileLinkAndAddFileToFirestore from '@/firebase/actions/getFileLinkAndAddFileToFirestore';
import updateUserDB from '@/firebase/actions/updateUserDB';
import usePhotoFromFirestore from '@/hooks/usePhotoFromFirestore';
import { TFile } from '@/types';

import { IconProfile, LabelEditProfile } from './styled';
import { TModalEditProfileProps } from './types';

const ModalEditProfile: FC<TModalEditProfileProps> = ({ userData }) => {
  const {
    id: userId,
    data: { login, email, telegramLink, photoLink },
  } = userData;

  const [newLogin, setNewLogin] = useState<string>(login);
  const [newEmail, setNewEmail] = useState<string>(email);
  const [newTelegramLink, setNewTelegramLink] = useState<string>(telegramLink);
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newFile, setNewFile] = useState<TFile>();

  const photo = usePhotoFromFirestore(photoLink);

  const clearPasswordInputs = () => {
    setOldPassword('');
    setNewPassword('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const isEmailChanged = newEmail !== email && newEmail !== '';

    const user = auth.currentUser;
    if (!user) return;

    const credential = EmailAuthProvider.credential(email, oldPassword);

    try {
      const isNewPasswordEntered = !!newPassword;

      if (isNewPasswordEntered) {
        await reauthenticateWithCredential(user, credential);
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
      const isNewPhotoLoaded = !!newFile;

      if (isLoginChanged || isTelegramChanged || isNewPhotoLoaded) {
        if (isNewPhotoLoaded) {
          const oldFileRef = ref(storage, `images/${photoLink}`);
          const newFileLink = await getFileLinkAndAddFileToFirestore(newFile, userId);
          await updateUserDB(userId, newLogin, newTelegramLink, newFileLink);

          if (photoLink) {
            await deleteObject(oldFileRef);
          }
        } else await updateUserDB(userId, newLogin, newTelegramLink);
      }
    } catch (error) {
      throw new Error(`Error occured while updating password: ${error}`);
    } finally {
      clearPasswordInputs();
    }
  };

  return (
    <>
      <LabelEditProfile>Edit profile</LabelEditProfile>
      {photoLink && <IconProfile src={photo} alt={login} />}
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
        <FileInput file={newFile} setFile={setNewFile} />
        <Button type="submit">Update</Button>
      </form>
    </>
  );
};

export default ModalEditProfile;
