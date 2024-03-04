import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  assignedUsers: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    required: true,
  },
})

export default mongoose.model('Project', projectSchema)
