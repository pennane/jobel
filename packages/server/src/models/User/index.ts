import { Schema, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import { IUser } from './types'

export const userSchema = new Schema<IUser>({
  profile: {
    userName: {
      type: String,
      required: true,
      unique: true,
      uniqueCaseInsensitive: true,
    },
    fullName: {
      type: String,
      required: false,
    },
  },
  roles: {
    type: [String],
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
})

userSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

userSchema.plugin(uniqueValidator)

export const User = model<IUser>('User', userSchema)
