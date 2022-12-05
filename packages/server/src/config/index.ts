import dotenv from 'dotenv'
import { validateConfig } from './lib'
dotenv.config()

const CONFIG = {
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
} as const

export type TUnvalidatedConfig = typeof CONFIG
export type TConfig = {
  [key in keyof TUnvalidatedConfig]: NonNullable<TUnvalidatedConfig[key]>
}

export const config = validateConfig(CONFIG)
