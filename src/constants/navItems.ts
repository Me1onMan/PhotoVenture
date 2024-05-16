import {
  GROUPS_PAGE_ROUTE,
  LIKED_POSTS_PAGE_ROUTE,
  MAP_PAGE_ROUTE,
  POSTS_PAGE_ROUTE,
  USERS_PAGE_ROUTE,
} from '@/router/routes';

type TNavItem = {
  to: string;
  title: string;
};

const navItems: Array<TNavItem> = [
  {
    to: POSTS_PAGE_ROUTE,
    title: 'Главная',
  },
  {
    to: GROUPS_PAGE_ROUTE,
    title: 'Группы',
  },
  {
    to: USERS_PAGE_ROUTE,
    title: 'Пользователи',
  },
  {
    to: MAP_PAGE_ROUTE,
    title: 'Карта',
  },
  {
    to: LIKED_POSTS_PAGE_ROUTE,
    title: 'Лайки',
  },
];

export default navItems;
