import { Document, ObjectId } from 'mongoose'
import { IComment } from '../Comment/types'

export interface IPost extends Document {
  userId: ObjectId
  voters: string[]
  score: number
  content: string
  timeStamp: Date
  color: number
  comments: IComment[]
  commentCount: number
}
