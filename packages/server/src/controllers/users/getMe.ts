import { RequestHandler } from 'express'
import { User } from '../../models/User'

export const getMe: RequestHandler = async (req, res) => {
  const id = req.tokenPayload?._id

  if (!id) throw new Error('Unauthorized :D')

  const user = await User.findById(id)

  res.send({ user })
}
