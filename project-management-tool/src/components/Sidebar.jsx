import React from 'react'

import { Link } from 'react-router-dom'
import { LayoutDashboard, LogOut, Plus, Settings } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { MinidenticonImg } from './Minidenticon'
import { Button } from './ui/button'
import AddProject from './AddProject'

const Sidebar = () => {
  const { user } = useAuth()

  return (
    <div className="h-full p-3 space-y-2 w-60 bg-background flex flex-col flex-shrink-0 border-r">
      <div className="flex items-center p-2 space-x-4">
        <MinidenticonImg className="w-12 h-12 rounded-full border p-1" username={user.username} />
        <div>
          <h2 className="text-lg font-semibold">{user.fullname}</h2>
          <span className="flex items-center space-x-1">
            <Link to="/dashboard/profile" className="text-xs hover:underline dark:text-gray-400">
              View profile
            </Link>
          </span>
        </div>
      </div>
      <div className="divide-y dark:divide-muted-foreground flex flex-col h-full">
        <ul className="pt-2 pb-4 space-y-1 text-sm">
          <li>
            <Button asChild variant="ghost" className="justify-start">
              <Link to="/dashboard" className="space-x-3 w-full">
                <LayoutDashboard size={16} strokeWidth={1.5} />
                <span>Dashboard</span>
              </Link>
            </Button>
          </li>
          <li>
            <AddProject />
          </li>
        </ul>

        <div>
          <h3 className="text-xs font-semibold text-gray-400 pt-4 px-2">Projects</h3>

          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li>
              <Button size="sm" asChild variant="ghost" className="justify-start">
                <Link to="/dashboard/project" className="space-x-3 w-full">
                  <Plus size={16} strokeWidth={1.5} />
                  <span>All Projects</span>
                </Link>
              </Button>
            </li>
          </ul>
        </div>

        <ul className="pt-2 mt-auto">
          <li>
            <Button asChild variant="ghost" className="justify-start">
              <Link to="/auth/logout" className="space-x-3 w-full">
                <LogOut strokeWidth={1.5} size={16} />
                <span>Logout</span>
              </Link>
            </Button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
