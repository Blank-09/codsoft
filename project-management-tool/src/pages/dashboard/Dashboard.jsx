import React from 'react'
import axios from 'axios'

import ProjectCard from '../../components/ProjectCard'

const Dashboard = () => {
  const [projects, setProjects] = React.useState([])

  React.useEffect(() => {
    axios.get('/api/projects').then((res) => {
      console.log(res.data)
      setProjects(res.data)
    })
  }, [])

  return (
    <div className="flex px-6 py-4 container">
      <div className="w-full">
        <div className="grid gap-4 grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
