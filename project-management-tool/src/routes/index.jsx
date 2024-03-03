import Login from '../pages/Login'
import Register from '../pages/Register'
import Root from '../pages/Root'

import { Outlet, createBrowserRouter } from 'react-router-dom'
import Auth from './Auth'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/dashboard',
    element: <div>Dashboard</div>,
  },
  {
    path: '/auth',
    element: <Auth />,
    children: [
      {
        path: '/auth/login',
        element: <Login />,
      },
      {
        path: '/auth/register',
        element: <Register />,
      },
    ],
  },
])

export default router
