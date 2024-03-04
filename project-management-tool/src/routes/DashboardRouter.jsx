import React from 'react'
import { Outlet } from 'react-router-dom'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const DashboardRouter = () => {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="w-full h-full bg-gray-50 overflow-auto">
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardRouter
