import HomePage from '@/pages/HomePage';

import { HOME_PAGE_ROUTE } from './routes';
import { TRoute } from './types';

const privateRoutes: Array<TRoute> = [
  {
    path: HOME_PAGE_ROUTE,
    element: HomePage,
  },
];

export default privateRoutes;
