import { Types } from 'mongoose'

export enum ERole {
  User = 'user',
  Admin = 'admin',
}

export type TTokenPayload = {
  profile?: {
    userName?: string
  }
  _id?: Types.ObjectId
  roles?: ERole[]
}
