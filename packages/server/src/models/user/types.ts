import { Document } from 'mongoose'
import { ERole } from '../../types'

interface IUserProfile {
  userName: string
  fullName?: string
}
export interface IUser extends Document {
  profile: IUserProfile
  roles: ERole[]
  passwordHash: string
}
