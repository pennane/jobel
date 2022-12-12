import { RequestHandler } from 'express'
import { path, isNil } from 'ramda'
import { Post } from '../../models/Post'

const getId = path(['params', 'id'])

export const getPostById: RequestHandler = async (req, res) => {
  const id = getId(req)

  const post = await Post.findById(id, {
    _id: 1,
    timeStamp: 1,
    color: 1,
    commentCount: 1,
    comments: 1,
    score: 1,
    content: 1,
  })
    .populate('comments', '_id visibleUserId timeStamp content score')
    .exec()

  if (isNil(post)) {
    return res.status(404).send({ error: 'Post does not exist' })
  }

  res.send({ post })
}
