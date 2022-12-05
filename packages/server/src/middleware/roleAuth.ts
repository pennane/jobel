import { Handler } from 'express'
import { intersection, isEmpty, not, path, pipe } from 'ramda'
import { ERole } from '../types'
import { EErrorType, throwError } from './errorHandler'

export const roleAuth = (allowedRoles: ERole[]): Handler => {
  const getHasRequiredRole = pipe(intersection(allowedRoles), isEmpty, not)

  return (req, _res, next) => {
    if (!req.tokenPayload) throwError(EErrorType.NOT_LOGGED_IN)

    const roles = path<ERole[]>(['tokenPayload', 'roles'], req)

    const hasRequiredRole = Array.isArray(roles) && getHasRequiredRole(roles)

    if (hasRequiredRole) {
      return next()
    }

    throwError(EErrorType.MISSING_ROLES)
  }
}
