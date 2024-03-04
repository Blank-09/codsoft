import './styles.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import axios from 'axios'

axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

// prettier-ignore
ReactDOM
  .createRoot(document.getElementById("root"))
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
