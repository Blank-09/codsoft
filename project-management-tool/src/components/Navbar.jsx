import React from 'react'
import { Button } from './ui/button'
import { TargetIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className="py-6 sticky top-0">
      <div className="container px-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold flex items-center">
            <TargetIcon className="w-8 h-8 mr-2" />
            <span>ManagePro</span>
          </h1>
        </div>
        <div className="space-x-2">
          {isAuthenticated ? (
            <Button variant="outline" asChild>
              <Link to="/auth/logout">Logout</Link>
            </Button>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link to="/auth/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/auth/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
