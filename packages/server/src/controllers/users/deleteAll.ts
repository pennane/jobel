import { RequestHandler } from 'express'
import { User } from '../../models/UserModel'

export const deleteAll: RequestHandler = async (req, res) => {
  await User.deleteMany({})

  res.status(200).send()
}
