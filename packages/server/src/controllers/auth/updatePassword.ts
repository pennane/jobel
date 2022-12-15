import { RequestHandler } from 'express'
import { User } from '../../models/User'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { config } from '../../config'
import { EErrorType, throwError } from '../../middleware/errorHandler'

const MAXIMUM_PASSWORD_LENGTH = 30
const MINIMUM_PASSWORD_LENGTH = 5

export const updatePassword: RequestHandler = async (req, res) => {
  const { newPassword, oldPassword } = req.body
  const userId = req.tokenPayload?._id

  if (!userId || typeof userId !== 'string') {
    return throwError(EErrorType.NOT_LOGGED_IN)
  }

  if (!oldPassword || typeof oldPassword !== 'string') {
    return res.status(400).send({ error: 'oldPassword missing' })
  }

  if (
    !newPassword ||
    typeof newPassword !== 'string' ||
    newPassword.length < MINIMUM_PASSWORD_LENGTH ||
    newPassword.length > MAXIMUM_PASSWORD_LENGTH
  ) {
    return res.status(400).send({ error: 'newPassword invalid' })
  }

  const user = await User.findById(userId)
  if (!user) {
    return res.status(400).send({ error: 'you do not exist' })
  }

  const validPassword = await bcrypt.compare(oldPassword, user.passwordHash)

  if (!validPassword) {
    return res.status(400).send({ error: 'invalid credentials' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(newPassword, saltRounds)

  await User.updateOne({ _id: userId }, { passwordHash })

  const savedUser = await User.findById(userId)

  if (!savedUser) {
    return res.status(500).send({ error: 'password update failed' })
  }
  const tokenPayload: JwtPayload = {
    _id: savedUser._id,
    profile: savedUser.profile,
    roles: savedUser.roles,
  }

  const token = jwt.sign(tokenPayload, config.JWT_SECRET)

  res.status(200).send({ token, user: tokenPayload })
}
