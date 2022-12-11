import { Router } from 'express'
import authRouter from './authRoutes'
import userRouter from './userRouter'
import postRouter from './postRoutes'
import commentRouter from './commentRoutes'

export const apiRoutes: Router[] = [userRouter, authRouter, postRouter, commentRouter]
