import React, { useEffect } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

import Calendar from './Calendar'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Checkbox } from './ui/checkbox'
import { Textarea } from './ui/textarea'

import { useMatch } from 'react-router-dom'
import { EyeIcon, EyeOffIcon, Plus } from 'lucide-react'
import { toast } from 'sonner'
import UsersSelect from './UsersSelect'

import Select from 'react-select'

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]

const initialState = {
  name: '',
  details: '',
  dueDate: '',
  category: '',
  assignedUsers: [],
}

const users = [
  { value: '1', label: 'Priyanshu T' },
  { value: '2', label: 'Alice' },
  { value: '3', label: 'John Smith' },
  { value: '4', label: 'Jane Smith' },
]

const AddProject = () => {
  const [data, setData] = React.useState(initialState)

  // const match = useMatch('/config-editor/edit/:id')
  // const isEditMode = match?.params.id !== undefined
  const isEditMode = false

  function onClickHandler() {
    const commonAttributes = {
      name: data.name,
      details: data.details,
      dueDate: data.dueDate,
      category: data.category,
      assignedUsers: data.assignedUsers,
    }

    setData(initialState)
  }

  function onChangeHandler(e) {
    setData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full space-x-3 justify-start">
          <Plus size={16} strokeWidth={1.5} />
          <span>Add Project</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit' : 'Add'} Project</DialogTitle>
          <DialogDescription>Please fill your Project details.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Project Name</Label>
            <Input onChange={onChangeHandler} value={data.name} id="name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="details">
              Project Details{' '}
              <Badge variant="ghost" className="bg-lime-300 text-foreground rounded-md">
                Markdown
              </Badge>
            </Label>
            <Textarea id="details" />
          </div>

          <div className="flex gap-2">
            <div className="w-3/5 grid gap-2">
              <Label htmlFor="tag">Tag</Label>
              {/* <TagComboBox /> */}
              <Input id="tag" onChange={onChangeHandler} value={data.category} />
            </div>
            <div className="w-2/5 grid gap-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Calendar
                id="dueDate"
                value={data.dueDate}
                onChange={(value) => setData((prev) => ({ ...prev, dueDate: value }))}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="assignedUsers">Assign to:</Label>
            <Select
              id="assignedUsers"
              options={users}
              onChange={(option) => setData((prev) => ({ ...prev, assignedUsers: option }))}
              isMulti
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={onClickHandler}
            size="sm"
            className="flex items-center space-x-1 rounded-md"
          >
            <Plus size={16} strokeWidth={1.5} />
            <span>{isEditMode ? 'Update' : 'Add'} Project</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddProject
