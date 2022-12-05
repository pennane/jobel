import { Handler } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config'

export const tokenExtractor: Handler = (req, _res, next) => {
  const authorization = req.get('Authorization')

  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    req.tokenPayload = null
    return next()
  }

  const token = authorization.substring(7)
  const payload = jwt.verify(token, config.JWT_SECRET)

  if (!payload || typeof payload === 'string') {
    req.tokenPayload = null
    return next()
  }

  req.tokenPayload = payload

  next()
}
