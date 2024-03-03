import React from 'react'
import { Button } from './ui/button'
import { TargetIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="px-4 py-4 shadow-sm sticky top-0 bg-white">
      <div className="container flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold flex items-center">
            <TargetIcon className="w-8 h-8 mr-2" />
            <span>ManagePro</span>
          </h1>
        </div>
        <div className="space-x-2">
          <Button variant="outline" asChild>
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button>
            <Link to="/auth/register">Register</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
