import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { ParsedError } from '@/errors'

import { ListUserInfoUseCase } from '../../../application/use-cases'
import { ListUserInfoDTO } from '../../../dtos'

export class ListUserInfoController {
  async handle(
    req: FastifyRequest<{ Querystring: { id?: string } }>,
    reply: FastifyReply,
  ): Promise<FastifyReply | void> {
    try {
      const listUserInfoUseCase = container.resolve(ListUserInfoUseCase)

      const { id, userId } = await ListUserInfoDTO.parseAsync({
        id: req.query?.id,
        userId: req.user.sub,
      })

      const userInfo = await listUserInfoUseCase.execute({
        userId: id || userId,
      })

      return reply.status(200).send(userInfo)
    } catch (error) {
      return ParsedError.toResponse({ error, reply })
    }
  }
}
