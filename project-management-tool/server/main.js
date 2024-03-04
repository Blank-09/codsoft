import express from 'express'
import ViteExpress from 'vite-express'

//
import connectDB from './config/db.js'

// Routes
import authRoute from './routes/auth.js'

const app = express()

// Configurations
connectDB()

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
app.use('/api/auth', authRoute)

ViteExpress.listen(app, process.env.PORT, () => {
  console.log('Server is listening on port 3000...')
})
