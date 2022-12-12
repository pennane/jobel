import { Schema, model } from 'mongoose'
import { IComment } from './types'

export const commentSchema = new Schema<IComment>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
  voters: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  score: {
    type: Number,
    required: true,
    default: 0,
  },
  content: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  visibleUserId: {
    type: Number,
    required: true,
  },
})

export const Comment = model<IComment>('Comment', commentSchema)
