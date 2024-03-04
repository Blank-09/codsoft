import { Router } from 'express'
import { authMiddleware } from '../../utils/index.js'

import Project from '../../models/Project.js'
import Comment from '../../models/Comment.js'

const router = Router()

router.get('/projects', authMiddleware, async (req, res) => {
  const projects = //
    await Project.find({}).populate({
      path: 'assignedUsers',
      select: '-password',
    })

  res.json(projects)
})

router.get('/project/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate({ path: 'assignedUsers', select: '-password' })
      .populate({ path: 'creator', select: '-password' })
      .populate({ path: 'comments', populate: { path: 'user', select: '-password' } })
    res.json(project)
  } catch (error) {
    res.status(404).json({ msg: 'Project not found' })
  }
})

router.post('/project/create', authMiddleware, async (req, res) => {
  const { name, details, dueDate, category, assignedUsers } = req.body
  const project = new Project({
    name,
    details,
    dueDate,
    category,
    creator: req.userId,
    assignedUsers,
  })
  await project.save()
  res.json(project)
})

router.put('/project/:id', authMiddleware, async (req, res) => {
  const { name, details, dueDate, category, assignedUsers } = req.body
  const project = await Project.findById(req.params.id)

  if (project.creator.toString() !== req.userId) {
    return res.status(403).json({ msg: 'Not authorized' })
  }

  project.name = name
  project.details = details
  project.dueDate = dueDate
  project.category = category
  project.assignedUsers = assignedUsers

  await project.save()
  res.json(project)
})

router.put('/project/:id/status', authMiddleware, async (req, res) => {
  const { status } = req.body
  const project = await Project.findById(req.params.id)

  if (project.creator.toString() !== req.userId) {
    return res.status(403).json({ msg: 'Not authorized' })
  }

  project.status = status

  await project.save()
  res.json(project)
})

router.delete('/project/:id', authMiddleware, async (req, res) => {
  const project = await Project.findById(req.params.id)

  if (project.creator.toString() !== req.userId) {
    return res.status(403).json({ msg: 'Not authorized' })
  }

  await project.remove()
  res.json({ msg: 'Project removed' })
})

// Comments
router.post('/project/:id/comment', authMiddleware, async (req, res) => {
  const project = await Project.findById(req.params.id)

  if (!project) {
    return res.status(404).json({ msg: 'Project not found' })
  }

  const comment = new Comment({
    text: req.body.text,
    user: req.userId,
  })

  comment.save()
  project.comments.push(comment)

  await project.save()
  res.json(comment)
})

router.delete('/project/:id/comment/:commentId', authMiddleware, async (req, res) => {
  const project = await Project.findById(req.params.id)

  if (!project) {
    return res.status(404).json({ msg: 'Project not found' })
  }

  const comment = project.comments.find((comment) => comment.id === req.params.commentId)

  if (!comment) {
    return res.status(404).json({ msg: 'Comment not found' })
  }

  if (comment.user.toString() !== req.userId) {
    return res.status(403).json({ msg: 'Not authorized' })
  }

  project.comments = project.comments.filter((comment) => comment.id !== req.params.commentId)

  await project.save()
  res.json(project.comments)
})

export default router
