import GroupPage from '@/pages/GroupPage';
import GroupsPage from '@/pages/GroupsPage';
import HomePage from '@/pages/HomePage';
import MapPage from '@/pages/MapPage';
import PostPage from '@/pages/PostPage';
import UserPage from '@/pages/UserPage';
import UsersPage from '@/pages/UsersPage';

import {
  GROUPS_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
  MAP_PAGE_ROUTE,
  SINGLE_GROUP_ROUTE,
  SINGLE_POST_ROUTE,
  SINGLE_USER_ROUTE,
  USERS_PAGE_ROUTE,
} from './routes';
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
  {
    path: SINGLE_POST_ROUTE,
    element: PostPage,
  },
  {
    path: SINGLE_GROUP_ROUTE,
    element: GroupPage,
  },
  {
    path: SINGLE_USER_ROUTE,
    element: UserPage,
  },
  {
    path: MAP_PAGE_ROUTE,
    element: MapPage,
  },
];

export default privateRoutes;
