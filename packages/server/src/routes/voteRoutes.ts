import { Router } from 'express'
import { votePost } from '../controllers/vote/votePost'
import { voteComment } from '../controllers/vote/voteComment'
import { roleAuth } from '../middleware/roleAuth'
import { ERole } from '../types'

const postRouter = Router()

postRouter.post(
  '/vote/comment/:commentId',
  [roleAuth([ERole.User])],
  voteComment
)
postRouter.post('/vote/post/:postId', [roleAuth([ERole.User])], votePost)

export default postRouter
