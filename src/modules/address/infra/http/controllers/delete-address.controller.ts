import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z as schemaValidator } from 'zod'

import { ParsedError } from '@/errors'

import { DeleteAddressUseCase } from '../../../application/use-cases'

export class DeleteAddressController {
  async handle(
    req: FastifyRequest<{ Querystring: { year: string } }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const deleteAddressUseCase = container.resolve(DeleteAddressUseCase)

      const { id } = await schemaValidator
        .object({
          id: schemaValidator.coerce.number().positive(),
        })
        .parseAsync(req.params)

      await deleteAddressUseCase.execute({
        id,
      })

      return reply.status(204).send()
    } catch (error) {
      return ParsedError.toResponse({ error, reply })
    }
  }
}
