import { ErrorRequestHandler } from 'express'

export enum EErrorType {
  MISSING_ROLES = 'Missing required roles',
  NOT_LOGGED_IN = 'Unauthenticated',
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
      return res.status(403).send({ error: message, code: 403 })
    }
    case EErrorType.NOT_LOGGED_IN: {
      return res.status(401).send({ error: message, code: 401 })
    }
    default: {
      console.error('unhandled error', err.stack)
      res.status(500).send({ error: 'Internal server error', code: 500 })
    }
  }
}
