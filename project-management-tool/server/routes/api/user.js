import { Router } from 'express'
import { authMiddleware } from '../../utils/index.js'
import User from '../../models/User.js'

const router = Router()

router.get('/users', authMiddleware, async (req, res) => {
  const users = await User.find({}).select('-password')
  res.json(users)
})

export default router
