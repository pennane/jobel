import { Router } from 'express'
import { login } from '../controllers/auth/login'
import { signUp } from '../controllers/auth/signUp'

const authRouter = Router()

authRouter.post('/auth/signup', signUp)
authRouter.post('/auth/login', login)

export default authRouter
