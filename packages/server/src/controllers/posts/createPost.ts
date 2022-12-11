import { RequestHandler } from 'express'
import { EErrorType, throwError } from '../../middleware/errorHandler'
import { Post } from '../../models/Post/'
import { IPost } from '../../models/Post/types'

const MINIMUM_POST_CONTENT_LENGTH = 2

const isValidContent = (s?: string) =>
  !s || typeof s !== 'string' || s.length < MINIMUM_POST_CONTENT_LENGTH

export const createPost: RequestHandler = async (req, res) => {
  const { content } = req.body as Partial<IPost>
  const userId = req.tokenPayload?._id

  if (!userId || typeof userId !== 'string') {
    return throwError(EErrorType.NOT_LOGGED_IN)
  }

  if (isValidContent(content)) {
    return res.status(400).send({ error: 'content missing' })
  }

  const post = new Post({ content, userId, voters: [], comments: [], color: 0 })

  const savedPost = await post.save()

  res.status(200).send(savedPost)
}
