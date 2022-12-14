import { RequestHandler } from 'express'
import { isNil, path } from 'ramda'
import { EErrorType, throwError } from '../../middleware/errorHandler'
import { Comment } from '../../models/Comment'
import { User } from '../../models/User'

const parseScoreValue = (s?: string) => {
  const n = Number(s)
  if (isNaN(n) || n === 0) return null
  if (n > 0) return 1
  return -1
}

const getCommentId = path(['params', 'commentId'])

export const voteComment: RequestHandler = async (req, res) => {
  const scoreString = path<string>(['body', 'score'], req)
  const userId = req.tokenPayload?._id
  const commentId = getCommentId(req)

  if (!userId || typeof userId !== 'string') {
    return throwError(EErrorType.NOT_LOGGED_IN)
  }

  if (!scoreString) {
    return res.status(400).send({ error: 'score missing' })
  }

  const score = parseScoreValue(scoreString)

  if (isNil(score)) {
    return res
      .status(400)
      .send({ error: 'score must be above or lower than 0' })
  }

  const user = await User.findById(userId)
  const comment = await Comment.findById(commentId)

  if (!user) {
    return res.status(404).send({ error: 'you do not exist' })
  }

  if (!comment) {
    return res.status(404).send({ error: 'comment does not exit' })
  }

  // @ts-expect-error types bad
  if (comment.voters.includes(user._id)) {
    return res.status(401).send({ error: 'you have already voted' })
  }

  const updated = await Comment.findOneAndUpdate(
    { _id: comment._id },
    {
      $inc: { score },
      $addToSet: { voters: user._id },
    },
    { new: true }
  )

  if (!updated) {
    return res.status(404).send({ error: 'comment does not exit' })
  }

  res.status(200).send({
    comment: {
      _id: updated._id,
      hasVoted: true,
      score: updated.score,
    },
  })
}
