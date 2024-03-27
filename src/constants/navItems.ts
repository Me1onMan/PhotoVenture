import { GROUPS_PAGE_ROUTE, HOME_PAGE_ROUTE, USERS_PAGE_ROUTE } from '@/router/routes';

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
];

export default navItems;
