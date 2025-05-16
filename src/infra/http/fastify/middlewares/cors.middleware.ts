import fastifyCors from '@fastify/cors'
import { FastifyInstance } from 'fastify'

import { env } from '@/infra/env'
import { Middleware } from '@/interfaces'

export class CorsMiddleware implements Middleware {
  apply(instance: FastifyInstance) {
    const corsRegex = new RegExp(env.CORS_ORIGIN)

    instance.register(fastifyCors, {
      origin: corsRegex,
      credentials: true,
    })
  }
}
