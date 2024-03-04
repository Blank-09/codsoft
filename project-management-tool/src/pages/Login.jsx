import React from 'react'
import axios from 'axios'

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
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { isAuthenticated, setIsAuthenticated, setUser } = useAuth()

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
      username: form.get('username'),
      password: form.get('password'),
    }

    axios
      .post('/api/auth/login', data)
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data))
        setIsAuthenticated(true)
        setUser(res.data)
        toast.success('Login successful')
        navigate('/dashboard')
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      })
  }

  return (
    <Card className="w-[400px]">
      <form onSubmit={onSubmitHandler}>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your ManagePro account.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" placeholder="Enter your username" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch space-y-3">
          <Button className="w-full">Login</Button>
          <span className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/auth/register" className="text-blue-500">
              Register
            </Link>
          </span>
        </CardFooter>
      </form>
    </Card>
  )
}

export default Login
