import * as React from 'react'
import { Outlet } from 'react-router-dom'

const Auth = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Outlet />
    </div>
  )
}

export default Auth
