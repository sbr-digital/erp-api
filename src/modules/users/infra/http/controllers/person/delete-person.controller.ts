import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { ParsedError } from '@/errors'

import { DeletePersonUseCase } from '../../../../application/use-cases'
import { DeletePersonDTO } from '../../../../dtos'

export class DeletePersonController {
  async handle(
    req: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const deletePersonUseCase = container.resolve(DeletePersonUseCase)

      const { id: personId } = req.params as { id: string }

      const { id } = await DeletePersonDTO.parseAsync({
        id: personId,
      })

      await deletePersonUseCase.execute({ id })

      return reply.status(204).send()
    } catch (error) {
      return ParsedError.toResponse({ error, reply })
    }
  }
}
