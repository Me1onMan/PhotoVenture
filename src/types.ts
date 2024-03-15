import { Timestamp } from 'firebase/firestore';

export type TUser = {
  id: string;
  token: string;
  login: string;
  email: string;
  telegramLink: string;
  password: string;
};

export type TEmotions = 'happiness' | 'sadness' | 'love' | 'hate' | 'joy' | 'surprise';
export type TPostTypes = 'nature' | 'architecture' | 'occasion' | 'event' | 'item';

export type TPost = {
  id: string;
  title: string;
  description: string;
  photoLinks: Array<string>;
  emotion: TEmotions;
  type: TPostTypes;
  advices: string;
  access: Array<'public' | 'private' | string>;
  authorId: string;
  createdAt: Timestamp;
  geoCoordinates: [number, number];
  commentsId: Array<string>;
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
  type: 'public' | 'private';
  membersId: Array<string>;
  ownerId: string;
};
