import { RequestHandler } from 'express'
import { EErrorType, throwError } from '../../middleware/errorHandler'
import { User } from '../../models/User'

export const getMe: RequestHandler = async (req, res) => {
  const id = req.tokenPayload?._id

  if (!id) throwError(EErrorType.NOT_LOGGED_IN)

  const user = await User.findById(id)

  if (!user) throwError(EErrorType.NOT_LOGGED_IN)

  res.send({ user })
}
