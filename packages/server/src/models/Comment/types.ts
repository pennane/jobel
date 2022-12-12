import { Document, ObjectId } from 'mongoose'

export interface IComment extends Document {
  userId: ObjectId
  postId: ObjectId
  voters: string[]
  score: number
  content: string
  timeStamp: Date
  visibleUserId: number
}
