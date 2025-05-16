import { FastifyReply, FastifyRequest } from 'fastify'

import { JWT } from '@/constants'

export async function verifyToken(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.clearCookie(JWT.TYPE.REFRESH_TOKEN)
    reply.status(403).send({ service: 'verifyToken', message: 'Unauthorized' })
  }
}
