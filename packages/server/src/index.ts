import { start } from './startup'
import { config } from './config'

console.log('Starting server..')

start()
  .configure(config)
  .then((app) => app.configureHttp())
  .then((app) => app.startDb())
  .then((app) => app.startHttp())
