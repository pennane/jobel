import { Router } from 'express'
import { getById } from '../controllers/users/getById'
import { getMe } from '../controllers/users/getMe'
import { deleteAll } from '../controllers/users/deleteAll'
import { roleAuth } from '../middleware/roleAuth'
import { ERole } from '../types'

const userRouter = Router()

userRouter.get('/users/me', [roleAuth([ERole.User])], getMe)
userRouter.get('/users/deleteall', [roleAuth([ERole.Admin])], deleteAll)
userRouter.get('/users/:_id', [roleAuth([ERole.User])], getById)

export default userRouter
