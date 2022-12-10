import { RequestHandler } from 'express'
import { isNil, path } from 'ramda'
import { User } from '../../models/User'

export const getById: RequestHandler = async (req, res) => {
  const id = path(['params', 'id'], req)

  const user = await User.findById(id)

  if (isNil(user)) {
    return res.status(404).send({ error: 'User does not exist' })
  }

  res.send(user)
}
