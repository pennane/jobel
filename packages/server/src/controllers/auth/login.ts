import { RequestHandler } from 'express'
import { User } from '../../models/UserModel'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { config } from '../../config'

export const login: RequestHandler = async (req, res) => {
  const { userName, password } = req.body

  if (!userName || typeof userName !== 'string') {
    return res.status(400).send({ error: 'userName missing' })
  }

  if (!password || typeof password !== 'string') {
    return res.status(400).send({ error: 'password missing' })
  }

  const user = await User.findOne({
    'profile.userName': userName,
  })

  if (!user) {
    return res.status(400).send({ error: 'invalid credentials' })
  }

  const validPassword = bcrypt.compare(password, user.passwordHash)

  if (!validPassword) {
    return res.status(400).send({ error: 'invalid credentials' })
  }

  const tokenPayload: JwtPayload = {
    userName: user.profile.userName,
    _id: user._id,
    roles: user.roles,
  }

  const token = jwt.sign(tokenPayload, config.JWT_SECRET)

  res.status(200).send({ token, ...tokenPayload })
}
