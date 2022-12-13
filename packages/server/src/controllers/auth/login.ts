import { RequestHandler } from 'express'
import { User } from '../../models/User'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { config } from '../../config'

const MAXIMUM_USERNAME_LENGTH = 24
const MAXIMUM_PASSWORD_LENGTH = 30

export const login: RequestHandler = async (req, res) => {
  const { userName, password } = req.body

  if (
    !userName ||
    typeof userName !== 'string' ||
    userName.length > MAXIMUM_USERNAME_LENGTH
  ) {
    return res.status(400).send({ error: 'userName missing or it is too long' })
  }

  if (
    !password ||
    typeof password !== 'string' ||
    password.length > MAXIMUM_PASSWORD_LENGTH
  ) {
    return res.status(400).send({ error: 'password missing or it is too long' })
  }

  const user = await User.findOne({
    'profile.userName': userName,
  })

  if (!user) {
    return res.status(400).send({ error: 'invalid credentials' })
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash)

  if (!validPassword) {
    return res.status(400).send({ error: 'invalid credentials' })
  }

  const tokenPayload: JwtPayload = {
    userName: user.profile.userName,
    _id: user._id,
    roles: user.roles,
  }

  const token = jwt.sign(tokenPayload, config.JWT_SECRET)

  res.status(200).send({ token, user: tokenPayload })
}
