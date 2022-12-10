import { ObjectId } from "mongoose"

export enum ERole {
  User = 'user',
  Admin = 'admin',
}

export type TTokenPayload = {
  userName?: string
  _id?: ObjectId
  roles?: ERole[]
}
