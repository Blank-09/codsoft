import React from 'react'
import { format } from 'date-fns'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Avatar } from './ui/avatar'
import { MinidenticonImg } from './Minidenticon'
import { Link } from 'react-router-dom'

const ProjectCard = ({ project }) => {
  return (
    <Card className="shadow border-none">
      <Link to={`/project/${project._id}`}>
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
          <CardDescription>{format(project.dueDate, 'PPPP')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex -space-x-3 mt-3">
            {project.assignedUsers.map((user) => (
              <Avatar key={user._id} className="shadow w-12 h-12 bg-white border p-1">
                <MinidenticonImg username={user.username} />
              </Avatar>
            ))}
          </div>
        </CardContent>
        {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
      </Link>
    </Card>
  )
}

export default ProjectCard
