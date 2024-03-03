import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

// Create Context
export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (prev) => {},
  user: {
    fullname: '',
    username: '',
    token: '',
  },
  setUser: (prev) => {},
})

// Hook
export const useAuth = () => React.useContext(AuthContext)

// Create Context Provider
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      return
    }

    axios
      .get('/api/auth/verify', {
        headers: { Authorization: token },
      })
      .then((res) => {
        if (res.status === 200) {
          axios.defaults.headers.common['Authorization'] = token
          setIsAuthenticated(true)
          setUser(JSON.parse(localStorage.getItem('user')))
        }
      })
      .catch((err) => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        axios.defaults.headers.common['Authorization'] = ''
        setIsAuthenticated(false)
        setUser(null)
      })
  }, [])

  // Value to be provided
  const value = {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
