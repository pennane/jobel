import { TTokenPayload } from '.'

declare module 'jsonwebtoken' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface JwtPayload extends TTokenPayload {}
}

declare global {
  namespace Express {
    interface Request {
      tokenPayload: TTokenPayload | null
    }
  }
}
