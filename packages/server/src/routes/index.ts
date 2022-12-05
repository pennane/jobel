import { Router } from 'express'
import authRouter from './authRoutes'
import userRouter from './userRouter'

export const apiRoutes: Router[] = [userRouter, authRouter]
