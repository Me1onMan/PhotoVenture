import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import privateRoutes from '@/router/privateRoutes';
import publicRoutes from '@/router/publicRoutes';
import { LOGIN_PAGE_ROUTE, POSTS_PAGE_ROUTE } from '@/router/routes';
import { selectIsAuth } from '@/store/slices/isAuthSlice';

const AppRouter = () => {
  const isAuth = useSelector(selectIsAuth);

  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map(({ path, element: Element }) => (
          <Route
            key={path}
            path={path}
            element={isAuth ? <Navigate to={POSTS_PAGE_ROUTE} replace /> : <Element />}
          />
        ))}
        {privateRoutes.map(({ path, element: Element }) => (
          <Route
            key={path}
            path={path}
            element={isAuth ? <Element /> : <Navigate to={LOGIN_PAGE_ROUTE} replace />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
