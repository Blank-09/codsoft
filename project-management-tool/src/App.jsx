import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from './components/ui/sonner'

import router from './routes'

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster richColors theme="light" />
    </AuthProvider>
  )
}

export default App
