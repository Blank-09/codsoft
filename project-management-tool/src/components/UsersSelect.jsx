import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { UsersRound } from 'lucide-react'
import { Button } from './ui/button'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from './ui/dropdown-menu'
import React, { useMemo, useState } from 'react'

const UsersSelect = () => {
  const [users, setUsers] = useState([
    { id: '1', fullname: 'Priyanshu T', username: 'johndoe', email: 'johndoe@gmail.com' },
    { id: '2', fullname: 'Alice', username: 'alice', email: '' },
    { id: '3', fullname: 'John Smith', username: 'johnsmith', email: '' },
    { id: '4', fullname: 'Jane Smith', username: 'janesmith', email: '' },
  ])

  const noOfSelectedUsers = useMemo(() => users.filter((user) => user.isSelected).length, [users])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto w-full">
          <UsersRound className="mr-2 h-4 w-4" />
          <div>
            Add Members
            <span className="text-muted-foreground font-normal ml-1">
              ({noOfSelectedUsers} selected)
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[17.3rem]">
        <DropdownMenuLabel>Assign Tasks</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {users.map((user) => {
          return (
            <DropdownMenuCheckboxItem
              key={user.id}
              className="capitalize"
              checked={user.isSelected}
              onCheckedChange={(value) =>
                setUsers((prev) =>
                  prev.map((u) => (u.id === user.id ? { ...u, isSelected: value } : u)),
                )
              }
            >
              {user.fullname}
            </DropdownMenuCheckboxItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UsersSelect
