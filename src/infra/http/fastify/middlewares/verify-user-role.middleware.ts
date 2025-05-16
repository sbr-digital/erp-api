import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '@/infra/database/prisma'

export function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = await prisma.user.findFirst({
      where: { id: request.user.sub },
    })

    if (!user || user.role !== roleToVerify)
      return reply.status(401).send({ message: 'Unauthorized' })
  }
}
