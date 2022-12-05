export enum ERole {
  User = 'user',
  Admin = 'admin',
}

export type TTokenPayload = {
  userName?: string
  _id?: string
  roles?: ERole[]
}
