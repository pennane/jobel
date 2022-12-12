import { RequestHandler } from 'express'
import { last } from 'ramda'
import { Post } from '../../models/Post'
import { IPost } from '../../models/Post/types'

const parseDate = (s: unknown) => {
  const shouldParse = !!s && (typeof s === 'string' || typeof s === 'number')
  if (!shouldParse) return null

  return new Date(s)
}

const FIELDS = {
  _id: 1,
  timeStamp: 1,
  content: 1,
  color: 1,
  score: 1,
  comments: 1,
  commentCount: 1,
}

const getHasMore = async (posts: IPost[]) => {
  const lastPost = last(posts)
  if (!lastPost) return false
  const nextPost = await Post.findOne(
    { timeStamp: { $lt: lastPost.timeStamp } },
    { _id: 1 }
  )
  if (!nextPost) return false

  return true
}

export const getPosts: RequestHandler = async (req, res) => {
  const olderThan = parseDate(req.query.olderThan)

  let posts

  if (olderThan) {
    posts = await Post.find({ timeStamp: { $lt: olderThan } }, FIELDS)
      .limit(10)
      .sort('-timeStamp')
      .exec()
  } else {
    posts = await Post.find({}, FIELDS).limit(10).sort('-timeStamp').exec()
  }

  const hasMore = await getHasMore(posts)
  const lastTimeStamp = last(posts)?.timeStamp || null

  res.send({
    posts: posts || [],
    hasMore,
    lastTimeStamp,
  })
}
