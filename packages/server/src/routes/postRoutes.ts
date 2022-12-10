import { Router } from 'express'
import { createPost } from '../controllers/posts/createPost'
import { getPostById } from '../controllers/posts/getPostById'
import { roleAuth } from '../middleware/roleAuth'
import { ERole } from '../types'

const postRouter = Router()

postRouter.post('/posts', [roleAuth([ERole.User])], createPost)
postRouter.get('/posts/:id', [], getPostById)

export default postRouter
