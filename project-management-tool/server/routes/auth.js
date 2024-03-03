import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Models
import User from '../models/User.js'

import { Router } from 'express'
import { config } from 'dotenv'
import { authMiddleware } from '../utils/index.js'

config()

const jwtSecret = process.env.JWT_SECRET
const router = Router()

router.get('/verify', authMiddleware, (req, res) => {
  return res.send({ success: true })
})

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).send({ message: 'Please enter all fields' })
    }

    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).send({ message: 'User does not exist' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: '30d',
    })

    res.send({ token })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Internal server error' })
  }
})

router.post('/register', async (req, res) => {
  try {
    const { fullname, username, password } = req.body

    if (!fullname || !username || !password) {
      return res.status(400).send({ message: 'Please enter all fields' })
    }

    const user = await User.findOne({ username })
    if (user) {
      return res.status(400).send({ message: 'Username already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({ fullname, username, password: hashedPassword })
    res.status(201).send({ message: 'User created successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: true, message: error.message })
  }
})

export default router
