import { createBrowserRouter } from 'react-router-dom'

import Auth from './Auth'
import DashboardRouter from './DashboardRouter'

import ErrorHandler from '../pages/ErrorHandler'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Register from '../pages/Register'
import Dashboard from '../pages/dashboard/Dashboard'
import Project from '../pages/project/Project'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardRouter />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/project/:id',
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
  {
    path: '*',
    element: <ErrorHandler />,
  },
])

export default router
