import { RequestHandler } from 'express'
import { path } from 'ramda'
import { User } from '../../models/User'

export const getById: RequestHandler = async (req, res) => {
  const id = path(['params', '_id'], req)

  const user = await User.findById(id)

  res.send(user)
}
