import React from 'react'
import Navbar from '../components/Navbar'

const Root = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-5xl font-semibold">Welcome to ManagePro</h1>
        <p className="text-muted-foreground mt-2">
          The best project management tool for your business.
        </p>
      </div>
    </>
  )
}

export default Root
