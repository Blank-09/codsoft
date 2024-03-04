import React from 'react'
import Navbar from '../components/Navbar'

const ErrorHandler = () => {
  window.location.href = '/'

  return (
    <>
      <p>Error</p>
    </>
  )
}

export default ErrorHandler
