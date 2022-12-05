import mongoose from 'mongoose'
import { TConfig } from '../config'

export const initializeDb = async ({ MONGO_DB_URI, MONGO_DB_NAME }: TConfig) =>
  new Promise((resolve, reject) =>
    mongoose
      .set({ strictQuery: false })
      .connect(MONGO_DB_URI, {
        dbName: MONGO_DB_NAME,
      })
      .then(resolve)
      .catch(reject)
  )
