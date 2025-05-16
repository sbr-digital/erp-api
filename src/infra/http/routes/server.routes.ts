import { FastifyInstance } from 'fastify'

import { PATHS } from '@/constants'
import { env } from '@/infra/env'

export async function serverRoutes(server: FastifyInstance) {
  server.get(PATHS.HEALTH_CHECK, async (_, reply) => {
    return reply.status(200).send({
      uptime: process.uptime(),
      responseTime: process.hrtime(),
      message: 'pong_',
      application: env.APPLICATION,
      environment: env.NODE_ENV,
      timestamp: new Date().getMilliseconds(),
    })
  })
}
