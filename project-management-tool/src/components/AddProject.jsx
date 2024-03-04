import React from 'react'
import axios from 'axios'

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
import { Textarea } from './ui/textarea'

import { useMatch, useNavigate } from 'react-router-dom'
import { EyeIcon, EyeOffIcon, Plus } from 'lucide-react'
import { toast } from 'sonner'

import ReactSelect from 'react-select'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

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

const AddProject = () => {
  const [data, setData] = React.useState(initialState)
  const [users, setUsers] = React.useState([])

  const navigate = useNavigate()

  // const match = useMatch('/config-editor/edit/:id')
  // const isEditMode = match?.params.id !== undefined
  const isEditMode = false

  React.useEffect(() => {
    axios.get('/api/users').then((res) => {
      setUsers(res.data.map((user) => ({ value: user._id, label: user.fullname })))
    })
  }, [])

  function onClickHandler() {
    axios
      .post('/api/project/create', {
        ...data,
        assignedUsers: data.assignedUsers.map((user) => user.value),
      })
      .then((res) => {
        navigate('/project/' + res.data._id)
        toast.success('Project added successfully')
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      })
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
            <Textarea id="details" value={data.details} onChange={onChangeHandler} />
          </div>

          <div className="flex gap-2">
            <div className="w-3/5 grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(value) => setData((prev) => ({ ...prev, category: value }))}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
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
            <ReactSelect
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
