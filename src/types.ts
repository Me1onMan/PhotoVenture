import { Timestamp } from 'firebase/firestore';

export type TUser = {
  id: string;
  // token: string;
  login: string;
  email: string;
  telegramLink: string;
  password: string;
};

export type TUserWOPassword = Omit<TUser, 'password'>;
export type TUserRegistraton = Omit<TUser, 'id' | 'token'>;

export type TEmotions = 'happiness' | 'sadness' | 'love' | 'hate' | 'joy' | 'surprise' | '';

export type TPostTypes = 'nature' | 'architecture' | 'occasion' | 'event' | 'item' | '';

export type TPost = {
  id: string;
  title: string;
  description: string;
  photoLinks: Array<string>;
  emotion: TEmotions;
  postType: TPostTypes;
  advices: string;
  access: 'public' | 'private' | string;
  authorId: string;
  geoCoordinates: [number, number];
  createdAt: Timestamp;
  commentsId: Array<string>;
  likedByIds: string[];
};

export type TPostCreate = Omit<
  TPost,
  'id' | 'createdAt' | 'commentsId' | 'photoLinks' | 'likedByIds'
> & {
  files: Array<TFile>;
};

export type TComment = {
  id: string;
  text: string;
  authorId: string;
  createdAt: Timestamp;
};

export type TGroup = {
  id: string;
  title: string;
  description: string;
  access: 'public' | 'private';
  membersId: Array<string>;
  ownerId: string;
};

export type TGroupCreate = Omit<TGroup, 'id' | 'membersId'>;

export type TIsAuth = {
  isAuth: boolean;
};

export type TFile =
  | (Blob & {
      name: string;
    })
  | (Uint8Array & {
      name: string;
    })
  | (ArrayBuffer & {
      name: string;
    })
  | null;

export type TSortOrder = 'asc' | 'desc';
