import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/Home';

const routes = [
  {
    path: '/',
    name: 'Home',
    element: <Home />,
    hidden: false,
  },
  {
    path: '/page-2',
    name: 'Page 2',
    element: <h1>PAGE 2</h1>,
    hidden: false,
  },
  {
    path: '/react-lib',
    name: 'ReactLib',
    element: <h1>react-lib</h1>,
    hidden: false,
  },
  {
    path: '*',
    name: '404',
    element: '404',
    hidden: true,
  },
];

export const navItems = routes.filter((route) => !route.hidden);

export const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};