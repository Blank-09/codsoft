import React from 'react'
import Sidebar from '../../components/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import ProjectCard from '../../components/ProjectCard'

const Dashboard = () => {
  return (
    <div className="flex px-6 py-4 container">
      <div className="w-full">
        <div className="grid gap-4 grid-cols-3">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
