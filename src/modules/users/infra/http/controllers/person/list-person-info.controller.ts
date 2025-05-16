import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { ParsedError } from '@/errors'

import { ListPersonInfoUseCase } from '../../../../application/use-cases'
import { ListPersonInfoDTO } from '../../../../dtos'

export class ListPersonInfoController {
  async handle(
    req: FastifyRequest<{ Querystring: { id?: string } }>,
    reply: FastifyReply,
  ): Promise<FastifyReply | void> {
    try {
      const listPersonInfoUseCase = container.resolve(ListPersonInfoUseCase)

      const { id } = req.params as { id: string }
      const { personId } = await ListPersonInfoDTO.parseAsync({
        personId: id,
      })

      const personInfo = await listPersonInfoUseCase.execute({
        personId,
      })

      return reply.status(200).send(personInfo)
    } catch (error) {
      return ParsedError.toResponse({ error, reply })
    }
  }
}
