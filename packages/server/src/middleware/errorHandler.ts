import { ErrorRequestHandler } from 'express'

export enum EErrorType {
  MISSING_ROLES = 'Missing required roles',
  NOT_LOGGED_IN = 'Not logged in',
}

export const throwError = (type: EErrorType) => {
  throw new Error(type)
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  const message = err.message as EErrorType | string

  switch (message) {
    case EErrorType.MISSING_ROLES: {
      return res.status(401).send({ error: message })
    }
    case EErrorType.NOT_LOGGED_IN: {
      return res.status(401).send({ error: message })
    }
    default: {
      console.error('unhandled error', err.stack)
      res.status(500).send()
    }
  }
}
