import { Router } from 'express'
import { createComment } from '../controllers/comments/createComment'
import { roleAuth } from '../middleware/roleAuth'
import { ERole } from '../types'

const commentRouter = Router()

commentRouter.post('/comments/:postId', [roleAuth([ERole.User])], createComment)



export default commentRouter
