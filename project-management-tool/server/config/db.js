import mongoose from 'mongoose'
import { MONGODB_URI } from '../constants.js'

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false)
    const conn = await mongoose.connect(MONGODB_URI)
    console.log(`Database Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
  }
}

export default connectDB
