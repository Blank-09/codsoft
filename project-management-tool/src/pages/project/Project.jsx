import React from 'react'
import { Avatar } from '@/components/ui/avatar'
import { MinidenticonImg } from '../../components/Minidenticon'
import { Textarea } from '../../components/ui/textarea'
import { Button } from '../../components/ui/button'
import { CheckCheckIcon, PencilIcon, Trash2Icon } from 'lucide-react'

const Project = () => {
  return (
    <div className="px-6 py-4 container flex items-start gap-6">
      <div className="w-4/6">
        <div className="bg-white rounded shadow-sm p-6">
          <h1 className="text-2xl font-semibold">Project Title</h1>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-500">Created by</span>
            <span className="text-gray-700 font-semibold">John Doe</span>
          </div>

          {/* Due date */}
          <div className="flex items-center mt-5">
            <p className="font-semibold">Project Due by Mon March 04, 2024</p>
          </div>

          {/* Description */}
          <div className="mt-8">
            <p className="text-gray-500 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula, ligula id
              luctus tincidunt, nisl libero tincidunt nunc, vitae ultricies est nunc eget nulla. Sed
              auctor, nisl in aliquam aliquet, nunc libero tincidunt nunc, vitae ultricies est nunc
              eget nulla. Sed auctor, nisl in aliquam aliquet, nunc libero tincidunt nunc, vitae
              ultricies est nunc eget nulla.
            </p>
          </div>

          {/* Assigned to */}
          <div className="mt-8">
            <h4 className="font-semibold">Assigned to:</h4>

            <div className="flex -space-x-3 mt-3">
              {new Array(5).fill(0).map((_, i) => (
                <Avatar key={i} className="shadow w-12 h-12 bg-white border p-1">
                  <MinidenticonImg username={i.toString().padStart(10, '0')} />
                </Avatar>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 space-x-3">
          <Button size="sm">
            <PencilIcon size={14} className="mr-1" />
            Edit Project
          </Button>
          <Button size="sm" variant="destructive">
            <Trash2Icon size={14} className="mr-1" />
            Delete Project
          </Button>
          <Button size="sm" variant="outline">
            <CheckCheckIcon size={14} className="mr-1" />
            Mark as Completed
          </Button>
        </div>
      </div>

      <div className="w-2/6">
        <h3 className="text-xl font-bold">Project Comments</h3>

        <div className="max-h-screen overflow-auto space-y-4 mt-4">
          {new Array(10).fill(0).map((_, i) => (
            <div key={i} className="bg-white p-4 rounded border">
              <div className="flex items-center space-x-2">
                <Avatar className="w-10 h-10 border shadow">
                  <MinidenticonImg username="johndoe" />
                </Avatar>
                <div>
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-xs text-gray-500">Mon March 04, 2024</p>
                </div>
              </div>
              <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          ))}
        </div>

        <form className="mt-4 flex flex-col space-y-4">
          <Textarea placeholder="Add a comment" />
          <Button className="ml-auto">Add Comment</Button>
        </form>
      </div>
    </div>
  )
}

export default Project
