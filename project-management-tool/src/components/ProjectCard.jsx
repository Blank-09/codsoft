import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Avatar } from './ui/avatar'
import { MinidenticonImg } from './Minidenticon'
import { Link } from 'react-router-dom'

const ProjectCard = () => {
  return (
    <Card className="shadow border-none">
      <Link to="/dashboard/project">
        <CardHeader>
          <CardTitle>Project Title</CardTitle>
          <CardDescription>Mon March 24, 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex -space-x-3 mt-3">
            {new Array(Math.floor(Math.random() * 6) + 1).fill(0).map((_, i) => (
              <Avatar key={i} className="shadow w-12 h-12 bg-white border p-1">
                <MinidenticonImg username={i.toString().padStart(10, '0')} />
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
