import HomePage from '@/pages/HomePage';
import UsersPage from '@/pages/UsersPage';

import { HOME_PAGE_ROUTE, USERS_PAGE_ROUTE } from './routes';
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
];

export default privateRoutes;
