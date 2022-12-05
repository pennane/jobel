import express, { Express } from 'express'
import cors from 'cors'
import { TConfig } from '../config/index.js'
import { initializeDb } from './lib.js'
import { apiRoutes } from '../routes/index.js'
import { errorHandler } from '../middleware/errorHandler.js'
import { unknownEndpoint } from '../middleware/unknownEndpoint.js'
import { tokenExtractor } from '../middleware/tokenExtractor.js'

export type TServer = {
  config?: TConfig
  server?: Express
  configure: (config: TConfig) => Promise<TServer>
  configureHttp: () => Promise<TServer>
  startDb: () => Promise<TServer>
  startHttp: () => Promise<TServer>
}

export const start = (): TServer => {
  return {
    configure: async function (config: TConfig) {
      this.config = config

      return this
    },
    configureHttp: async function () {
      this.server = express()

      this.server.use(cors())
      this.server.use(express.json())
      this.server.use(tokenExtractor)
      this.server.use('/api/v1', apiRoutes)
      this.server.use(unknownEndpoint)
      this.server.use(errorHandler)

      return this
    },
    startDb: async function () {
      if (!this.config) throw new Error('Missing config')

      await initializeDb(this.config)

      console.log('Mongo running')

      return this
    },
    startHttp: async function () {
      if (!this.config) throw new Error('Missing config')
      if (!this.server) throw new Error('Server has not been initialized')

      const { PORT } = this.config

      this.server.listen(PORT, () => {
        console.log(`Express running on port ${PORT}`)
      })

      return this
    },
  }
}
