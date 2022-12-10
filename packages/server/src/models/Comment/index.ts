import { Schema, model } from 'mongoose'
import { IComment } from './types'

export const commentSchema = new Schema<IComment>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  voters: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  score: {
    type: Number,
    required: true,
    default: 0
  },
  content: {
    type: String,
    required: true
  },
  timeStamp: {
    type: Date,
    default: Date.now
  }
})


export const Comment = model<IComment>('Comment', commentSchema)
