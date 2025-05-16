import { server } from './app'
import { env } from './infra'

server.start(env.PORT).then(() => {
  server.fatifyLogger.info(
    `🚀 The [${env.APPLICATION}] application was started in the [${env.NODE_ENV}].`,
  )
  server.fatifyLogger.info(
    `🚀 The server was started correctly on PORT: [${env.PORT}]`,
  )
})
