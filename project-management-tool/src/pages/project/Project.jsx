import React from 'react'
import axios from 'axios'
import { format } from 'date-fns'
import { CheckCheckIcon, PencilIcon, Trash2Icon } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { Avatar } from '@/components/ui/avatar'
import { MinidenticonImg } from '@/components/Minidenticon'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useAuth } from '../../context/AuthContext'

const Project = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [project, setProject] = React.useState({})

  React.useEffect(() => {
    axios
      .get(`/api/project/${id}`)
      .then((res) => setProject(res.data))
      .catch((err) => {
        toast.error('An error occurred while fetching project details')
        console.error(err)
      })
  }, [])

  function onSubmitHandler(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const comment = formData.get('comment')

    axios.post(`/api/project/${id}/comment`, { text: comment }).then((res) => {
      res.data.user = {
        _id: res.data.user,
        fullname: user.fullname,
        username: user.username,
      }

      setProject((prev) => ({
        ...prev,
        comments: [...prev.comments, res.data],
      }))
      e.target.reset()
    })
  }

  function markAsCompleteHandler() {
    const status = project.status === 'completed' ? 'incomplete' : 'completed'

    axios
      .put(`/api/project/${id}/status`, { status })
      .then((res) => {
        setProject((prev) => ({ ...prev, status }))
        toast[status === 'completed' ? 'success' : 'error']('Project marked as ' + status)
      })
      .catch((err) => {
        toast.error('An error occurred while marking project as completed')
        console.error(err)
      })
  }

  if (!project._id) {
    return <div>Loading...</div>
  }

  return (
    <div className="px-6 py-4 container flex items-start gap-6">
      <div className="w-4/6">
        <div className="bg-white rounded shadow-sm p-6">
          <h1 className="text-2xl font-semibold">{project.name}</h1>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-500">Created by</span>
            <span className="text-gray-700 font-semibold">{project.creator.fullname}</span>
          </div>

          {/* Due date */}
          <div className="flex items-center mt-5">
            <p className="font-semibold">Project Due by {format(project.dueDate, 'PP')}</p>
          </div>

          {/* Description */}
          <div className="mt-8">
            <p className="text-gray-500 mt-2">{project.details}</p>
          </div>

          {/* Assigned to */}
          <div className="mt-8">
            <h4 className="font-semibold">Assigned to:</h4>

            <div className="flex -space-x-3 mt-3">
              {project.assignedUsers.map((user) => (
                <Avatar
                  key={user._id}
                  title={user.fullname}
                  className="shadow w-12 h-12 bg-white border p-1"
                >
                  <MinidenticonImg username={user.username} />
                </Avatar>
              ))}
            </div>
          </div>
        </div>

        {user.id === project.creator._id && (
          <div className="mt-6 space-x-3">
            {/* <Button size="sm">
            <PencilIcon size={14} className="mr-1" />
            Edit Project
          </Button>
          <Button size="sm" variant="destructive">
            <Trash2Icon size={14} className="mr-1" />
            Delete Project
          </Button> */}
            <Button size="sm" variant="outline" onClick={markAsCompleteHandler}>
              <CheckCheckIcon size={14} className="mr-1" />
              Mark as {project.status === 'completed' ? 'Incomplete' : 'Completed'}
            </Button>
          </div>
        )}
      </div>

      <div className="w-2/6">
        <h3 className="text-xl font-bold">Project Comments</h3>

        <div className="max-h-screen overflow-auto space-y-4 mt-4">
          {project.comments.map((comment) => (
            <div key={comment._id} className="bg-white p-4 rounded border">
              <div className="flex items-center space-x-2">
                <Avatar className="w-10 h-10 border shadow">
                  <MinidenticonImg username={comment.user.username} />
                </Avatar>
                <div>
                  <h4 className="font-semibold">{comment.user.fullname}</h4>
                </div>
              </div>
              <p className="mt-2">{comment.text}</p>
            </div>
          ))}
        </div>

        <form className="mt-4 flex flex-col space-y-4" onSubmit={onSubmitHandler}>
          <Textarea placeholder="Add a comment" name="comment" />
          <Button className="ml-auto">Add Comment</Button>
        </form>
      </div>
    </div>
  )
}

export default Project
