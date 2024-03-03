import React from 'react'
import axios from 'axios'

import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '../context/AuthContext'

const Register = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  React.useEffect(() => {
    if (isAuthenticated) {
      toast.info('You are already logged in')
      navigate('/')
    }
  }, [navigate, isAuthenticated])

  async function onSubmitHandler(e) {
    e.preventDefault()

    const form = new FormData(e.currentTarget)

    const data = {
      fullname: form.get('name'),
      username: form.get('username'),
      password: form.get('password'),
    }

    try {
      const response = await axios.post('/api/auth/register', data)

      if (response.status === 201) {
        navigate('/auth/login')
        toast.success(response.data.message)
      }
    } catch (e) {
      toast.error(e.response.data.message)
    }
  }

  return (
    <Card className="w-[400px]">
      <form onSubmit={onSubmitHandler}>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create an account for ManagePro.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Enter your name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" placeholder="Enter your username" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch space-y-3">
          <Button className="w-full">Register</Button>
          <span className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-blue-500">
              Login
            </Link>
          </span>
        </CardFooter>
      </form>
    </Card>
  )
}

export default Register
