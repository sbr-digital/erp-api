import fastifyHelmet from '@fastify/helmet'
import { FastifyInstance } from 'fastify'

import { Middleware } from '@/interfaces'

export class HelmetMiddleware implements Middleware {
  apply(instance: FastifyInstance) {
    instance.register(fastifyHelmet)
  }
}
