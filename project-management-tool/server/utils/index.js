import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../constants.js'

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.userId = decoded.userId
    next()
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}

export { authMiddleware }
