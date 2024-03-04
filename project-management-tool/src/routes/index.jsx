import { createBrowserRouter } from 'react-router-dom'

import Auth from './Auth'
import DashboardRouter from './DashboardRouter'

import Root from '../pages/Root'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Register from '../pages/Register'
import Dashboard from '../pages/dashboard/Dashboard'
import Project from '../pages/project/Project'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/dashboard',
    element: <DashboardRouter />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/dashboard/project',
        element: <Project />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Auth />,
    children: [
      {
        path: '/auth/register',
        element: <Register />,
      },
      {
        path: '/auth/login',
        element: <Login />,
      },
      {
        path: '/auth/logout',
        element: <Logout />,
      },
    ],
  },
])

export default router
