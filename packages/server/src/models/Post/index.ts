import { Schema, model } from 'mongoose'
import { IPost } from './types'

export const postSchema = new Schema<IPost>({
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
  },
  color: {
    type: Number,
    default: 0
  },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
})

postSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    delete returnedObject.__v
  },
})

postSchema.virtual("commentCount").get(function () {
  return this.comments.length
})


export const Post = model<IPost>('Post', postSchema)
