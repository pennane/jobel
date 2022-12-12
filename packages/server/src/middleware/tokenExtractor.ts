import { Handler } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config'
import { EErrorType, throwError } from './errorHandler'

export const tokenExtractor: Handler = (req, _res, next) => {
  const authorization = req.get('Authorization')

  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    req.tokenPayload = null
    return next()
  }

  const token = authorization.substring(7)

  let payload
  try {
    payload = jwt.verify(token, config.JWT_SECRET)
  } catch {
    throwError(EErrorType.NOT_LOGGED_IN)
  }

  if (!payload || typeof payload === 'string') {
    req.tokenPayload = null
    return next()
  }

  req.tokenPayload = payload

  next()
}
