import fastifyCookie from '@fastify/cookie'
import { FastifyInstance } from 'fastify'

import { Middleware } from '@/interfaces'

export class CookiesMiddleware implements Middleware {
  apply(instance: FastifyInstance) {
    instance.register(fastifyCookie)
  }
}
