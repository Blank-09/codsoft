import React from 'react'

const Logout = () => {
  React.useEffect(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setTimeout(() => {
      window.location.href = '/auth/login'
    }, 1000)
  }, [])

  return <h1>Logging out...</h1>
}

export default Logout
