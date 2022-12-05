import { RequestHandler } from 'express'
import { User } from '../../models/User'
import bcrypt from 'bcrypt'
import { ERole } from '../../types'

export const signUp: RequestHandler = async (req, res) => {
  const { userName, password } = req.body

  if (!userName || typeof userName !== 'string') {
    return res.status(400).send({ error: 'userName missing' })
  }

  if (!password || typeof password !== 'string') {
    return res.status(400).send({ error: 'password missing' })
  }

  // TODO: Validate password and username requirements

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

  res.status(201).send(savedUser)
}
