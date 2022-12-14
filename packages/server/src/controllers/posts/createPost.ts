import { RequestHandler } from 'express'
import { path, pick } from 'ramda'
import { EErrorType, throwError } from '../../middleware/errorHandler'
import { Post } from '../../models/Post/'
let lastColor = 0

const MINIMUM_POST_CONTENT_LENGTH = 2
const MAXIMUM_POST_CONTENT_LENGTH = 250

const isValidContent = (s?: string) =>
  !s ||
  typeof s !== 'string' ||
  s.length < MINIMUM_POST_CONTENT_LENGTH ||
  s.length > MAXIMUM_POST_CONTENT_LENGTH

const randomInteger = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const randomNewInteger = (old: number, min: number, max: number) => {
  let newNumber
  let tries = 0
  do {
    newNumber = randomInteger(min, max)
    tries++
  } while (newNumber === old && tries < 10)
  return newNumber
}

const COLORS = ['#800f3f', '#0f8022', '#b24822', '#5d23b2', '#242ab2']

export const createPost: RequestHandler = async (req, res) => {
  const content = path<string>(['body', 'content'], req)
  const userId = req.tokenPayload?._id

  if (!userId || typeof userId !== 'string') {
    return throwError(EErrorType.NOT_LOGGED_IN)
  }

  if (isValidContent(content)) {
    return res.status(400).send({ error: 'content missing' })
  }

  const color = randomNewInteger(lastColor, 0, COLORS.length - 1)
  lastColor = color

  const post = new Post({
    content,
    userId,
    voters: [],
    comments: [],
    color,
    userIds: [userId],
    score: 0,
  })

  const savedPost = await post.save()

  res.status(200).send({
    post: {
      ...pick(
        ['content', 'userId', '_id', 'comments', 'timeStamp', 'color', 'score'],
        savedPost
      ),
      you: true,
      visibleUserId: 0,
    },
  })
}
