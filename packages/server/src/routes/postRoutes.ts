import { Router } from 'express'
import { createPost } from '../controllers/posts/createPost'
import { roleAuth } from '../middleware/roleAuth'
import { ERole } from '../types'

const postRouter = Router()

postRouter.post('/posts', [roleAuth([ERole.User])], createPost)

export default postRouter
