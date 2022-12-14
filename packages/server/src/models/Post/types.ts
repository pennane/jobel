import { ObjectId } from 'mongoose'
import { IComment } from '../Comment/types'

export interface IPost {
  userId: ObjectId
  voters: ObjectId[]
  score: number
  content: string
  timeStamp: Date
  color: number
  comments: IComment[]
  commentCount: number
  userIds: ObjectId[]
  visibleUserId: 0
}
