import { Router } from 'express'
import { login } from '../controllers/auth/login'
import { signUp } from '../controllers/auth/signUp'
import { updatePassword } from '../controllers/auth/updatePassword'
import { roleAuth } from '../middleware/roleAuth'
import { ERole } from '../types'

const authRouter = Router()

authRouter.post('/auth/signup', signUp)
authRouter.post('/auth/login', login)
authRouter.post(
  '/auth/updatepassword',
  [roleAuth([ERole.User])],
  updatePassword
)

export default authRouter
