import { RequestHandler } from 'express'
import { User } from '../../models/User'
import bcrypt from 'bcrypt'
import { ERole } from '../../types'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { config } from '../../config'

const MAXIMUM_USERNAME_LENGTH = 24
const MAXIMUM_PASSWORD_LENGTH = 30

export const signUp: RequestHandler = async (req, res) => {
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

  const userWithSameUserName = await User.findOne(
    {
      'profile.userName': userName,
    },
    { projection: { _id: 1 } }
  )

  if (userWithSameUserName) {
    return res.status(400).send({ error: 'userName already used' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    profile: { userName },
    passwordHash,
    roles: [ERole.User],
  })

  const savedUser = await user.save()

  const tokenPayload: JwtPayload = {
    userName: savedUser.profile.userName,
    _id: savedUser._id,
    roles: savedUser.roles,
  }

  const token = jwt.sign(tokenPayload, config.JWT_SECRET)

  res.status(201).send({ token, user: tokenPayload })
}
