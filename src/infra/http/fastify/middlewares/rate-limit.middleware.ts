import fastifyRateLimit from '@fastify/rate-limit'
import { FastifyInstance } from 'fastify'

import { Middleware } from '@/interfaces'

export class RateLimitMiddleware implements Middleware {
  apply(instance: FastifyInstance) {
    instance.register(fastifyRateLimit)
  }
}
