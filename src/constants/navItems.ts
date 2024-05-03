import {
  GROUPS_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
  LIKED_POSTS_PAGE_ROUTE,
  MAP_PAGE_ROUTE,
  USERS_PAGE_ROUTE,
} from '@/router/routes';

type TNavItem = {
  to: string;
  title: string;
};

const navItems: Array<TNavItem> = [
  {
    to: HOME_PAGE_ROUTE,
    title: 'Home',
  },
  {
    to: GROUPS_PAGE_ROUTE,
    title: 'Groups',
  },
  {
    to: USERS_PAGE_ROUTE,
    title: 'Users',
  },
  {
    to: MAP_PAGE_ROUTE,
    title: 'Map',
  },
  {
    to: LIKED_POSTS_PAGE_ROUTE,
    title: 'Likes',
  },
];

export default navItems;
