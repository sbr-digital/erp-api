import fastify, { FastifyInstance } from 'fastify'

import { ErrorHandler, Middleware, Route, Server } from '@/interfaces'
import { PinoLoggerService } from '@/infra/services'

export class FastifyServer implements Server {
  private server: FastifyInstance
  private logger: PinoLoggerService

  constructor() {
    this.logger = new PinoLoggerService()

    this.server = fastify({
      loggerInstance: this.logger.getLogger(),
      disableRequestLogging: true,
    })
  }

  public get instance(): FastifyInstance {
    return this.server
  }

  public get fatifyLogger() {
    return this.logger
  }

  async registerMiddlewares(middlewares: Middleware[]): Promise<void> {
    for (const middleware of middlewares) {
      middleware.apply(this.server)
    }
  }

  async registerRoutes(routes: Route[]): Promise<void> {
    for (const route of routes) {
      route(this.server)
    }
  }

  async registerErrorHandler(errorHandlers: ErrorHandler[]): Promise<void> {
    for (const errorHandler of errorHandlers) {
      this.server.setErrorHandler((error, req, reply) => {
        errorHandler.handle(error, req, reply)
      })
    }
  }

  async start(port: number): Promise<void> {
    // TODO CORRIGIR ISSO

    this.server.listen({
      host: '0.0.0.0',
      port,
    })
  }
}
