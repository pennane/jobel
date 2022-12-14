import { RequestHandler } from 'express'
import { path, isNil, omit, pipe } from 'ramda'
import { Post } from '../../models/Post'
import { Document, Types } from 'mongoose'
import { IPost } from '../../models/Post/types'

const parseHasVoted = (userId?: Types.ObjectId) => (post: IPost & Document) => {
  if (!userId) {
    return post.toObject()
  }

  const comments = post.comments.map((m) => {
    console.log(m, userId)
    const obu = m.toObject()
    const withoutVoters = omit(['voters'], obu)
    return {
      ...withoutVoters,
      // @ts-expect-error asdf
      hasVoted: m.voters.includes(userId),
    }
  })

  return {
    ...post.toObject(),
    // @ts-expect-error asdf
    hasVoted: post.voters.includes(userId),
    comments,
  }
}

const getId = path(['params', 'id'])

export const getPostById: RequestHandler = async (req, res) => {
  const id = getId(req)
  const userId = req.tokenPayload?._id

  const post = await Post.findById(id, {
    _id: 1,
    timeStamp: 1,
    color: 1,
    commentCount: 1,
    comments: 1,
    score: 1,
    content: 1,
    visibleUserId: 1,
    voters: 1,
  })
    .populate('comments', '_id visibleUserId timeStamp content score voters')
    .exec()

  if (isNil(post)) {
    return res.status(404).send({ error: 'Post does not exist' })
  }
  const parsedPost = pipe(parseHasVoted(userId), omit(['voters']))(post)

  res.send({ post: parsedPost })
}
