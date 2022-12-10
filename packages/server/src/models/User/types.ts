import { ERole } from '../../types'

interface IUserProfile {
  userName: string
  fullName?: string
}
export interface IUser {
  profile: IUserProfile
  roles: ERole[]
  passwordHash: string
}
