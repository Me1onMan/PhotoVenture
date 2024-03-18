import { BrowserRouter, Route, Routes } from 'react-router-dom';

import privateRoutes from '@/router/privateRoutes';
import publicRoutes from '@/router/publicRoutes';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map(({ path, element: Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
        {privateRoutes.map(({ path, element: Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
