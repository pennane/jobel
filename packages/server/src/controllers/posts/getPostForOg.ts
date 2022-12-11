import { RequestHandler } from 'express'
import { path, isNil } from 'ramda'
import { Post } from '../../models/Post'

const getId = path(['params', 'id'])

export const getPostForOg: RequestHandler = async (req, res) => {
  const id = getId(req)

  const post = await Post.findById(id, {
    content: 1,
    commentCount: 1,
    score: 1,
    timeStamp: 1,
  })

  if (isNil(post)) {
    return res.status(404).send({ error: 'Post does not exist' })
  }

  res.send(post)
}
