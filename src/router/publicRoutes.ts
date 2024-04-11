import LoginPage from '@/pages/LoginPage';
import RegistrationPage from '@/pages/RegistrationPage';

import { LOGIN_PAGE_ROUTE, REGISTRATION_PAGE_ROUTE } from './routes';
import { TRoute } from './types';

const publicRoutes: Array<TRoute> = [
  {
    path: REGISTRATION_PAGE_ROUTE,
    element: RegistrationPage,
  },
  {
    path: LOGIN_PAGE_ROUTE,
    element: LoginPage,
  },
  {
    path: LOGIN_PAGE_ROUTE,
    element: LoginPage,
  },
];

export default publicRoutes;
