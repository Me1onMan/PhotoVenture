import GroupsPage from '@/pages/GroupsPage';
import HomePage from '@/pages/HomePage';
import UsersPage from '@/pages/UsersPage';

import { GROUPS_PAGE_ROUTE, HOME_PAGE_ROUTE, USERS_PAGE_ROUTE } from './routes';
import { TRoute } from './types';

const privateRoutes: Array<TRoute> = [
  {
    path: HOME_PAGE_ROUTE,
    element: HomePage,
  },
  {
    path: USERS_PAGE_ROUTE,
    element: UsersPage,
  },
  {
    path: GROUPS_PAGE_ROUTE,
    element: GroupsPage,
  },
];

export default privateRoutes;
