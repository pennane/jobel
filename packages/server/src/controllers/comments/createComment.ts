import { RequestHandler } from 'express'
import { ObjectId } from 'mongoose'
import {
  addIndex,
  always,
  concat,
  construct,
  descend,
  find,
  identity,
  ifElse,
  invoker,
  isNil,
  length,
  map,
  path,
  pick,
  pipe,
  pluck,
  prop,
  propEq,
  sortBy,
  sortWith,
  uniq,
} from 'ramda'
import { EErrorType, throwError } from '../../middleware/errorHandler'
import { Comment } from '../../models/Comment/'
import { IComment } from '../../models/Comment/types'
import { Post } from '../../models/Post'
import { IPost } from '../../models/Post/types'
import { User } from '../../models/User'

const MINIMUM_Comment_CONTENT_LENGTH = 2

const isValidContent = (s?: string) =>
  !s || typeof s !== 'string' || s.length < MINIMUM_Comment_CONTENT_LENGTH

const getPostId = path(['params', 'postId'])

const getVisibleUserId = (post: IPost, userId: ObjectId) => {
  const index = post.userIds.indexOf(userId)
  if (index === -1) return post.userIds.length
  return index
}

export const createComment: RequestHandler = async (req, res) => {
  const content = path<string>(['body', 'content'], req)
  const userId = req.tokenPayload?._id
  const postId = getPostId(req)

  if (!userId || typeof userId !== 'string') {
    return throwError(EErrorType.NOT_LOGGED_IN)
  }

  if (isValidContent(content)) {
    return res.status(400).send({ error: 'content missing' })
  }

  const user = await User.findById(userId)
  const post = await Post.findById(postId)

  if (!user) {
    return res.status(404).send({ error: 'you do not exist' })
  }

  if (!post) {
    return res.status(404).send({ error: 'post missing' })
  }

  const comment = new Comment({
    content,
    userId,
    voters: [],
    postId,
    visibleUserId: getVisibleUserId(post, userId),
  })

  const savedComment = await comment.save()

  await Post.updateOne(
    { _id: post._id },
    { $push: { comments: savedComment._id }, $addToSet: { userIds: userId } }
  )
  await User.updateOne(
    { _id: post._id },
    { $push: { comments: savedComment._id } }
  )

  res.status(200).send({
    comment: pick(
      ['_id', 'userId', 'content', 'postId', 'visibleUserId', 'timeStamp'],
      savedComment
    ),
  })
}
