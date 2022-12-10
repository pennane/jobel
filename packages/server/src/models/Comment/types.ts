import { Document, ObjectId } from 'mongoose'

export interface IComment extends Document {
  userId: ObjectId
  voters: string[]
  score: number
  content: string
  timeStamp: Date
}
