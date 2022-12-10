import { Types } from 'mongoose'

export enum ERole {
  User = 'user',
  Admin = 'admin',
}

export type TTokenPayload = {
  userName?: string
  _id?: Types.ObjectId
  roles?: ERole[]
}
