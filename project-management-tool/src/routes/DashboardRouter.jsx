import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { toast } from 'sonner'

const DashboardRouter = () => {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login')
      toast.error('You are not authenticated. Please login to continue.')
    }

    if (window.location.pathname === '/') {
      navigate('/dashboard')
    }
  }, [isAuthenticated])

  return (
    <div className="h-screen flex">
      {user && (
        <>
          <Sidebar />
          <div className="w-full h-full bg-gray-50 overflow-auto">
            <Navbar />
            <Outlet />
          </div>
        </>
      )}
    </div>
  )
}

export default DashboardRouter
