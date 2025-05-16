/* eslint-disable @typescript-eslint/no-explicit-any */
export type Route = (server: any) => void

export interface Middleware {
  apply(instance?: any): any
}

export interface ErrorHandler {
  handle(error: any, request: any, reply: any): void
}

export interface Server {
  registerRoutes(routes: Route[]): void
  registerMiddlewares(middleware?: Middleware[]): void
  registerErrorHandler(errorHandler: ErrorHandler[]): void
  start(port: number): void
}
