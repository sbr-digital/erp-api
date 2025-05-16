import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { ParsedError } from '@/errors'

import { UpdatePersonUseCase } from '../../../../application/use-cases'
import { UpdatePersonDTO, UpdatePersonInput } from '../../../../dtos'

export class UpdatePersonController {
  async handle(
    req: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const updatePersonUseCase = container.resolve(UpdatePersonUseCase)

      const { id: personId } = req.params as { id: string }

      const payload = await UpdatePersonDTO.parseAsync({
        ...(req.body as UpdatePersonInput),
        id: personId,
      })

      await updatePersonUseCase.execute(payload)

      return reply.status(204).send()
    } catch (error) {
      return ParsedError.toResponse({ error, reply })
    }
  }
}
