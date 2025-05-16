import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { ParsedError } from '@/errors'

import { CreatePersonUseCase } from '../../../../application/use-cases'
import { CreatePersonDTO } from '../../../../dtos'

export class CreatePersonController {
  async handle(
    req: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const createPersonUseCase = container.resolve(CreatePersonUseCase)

      const payload = await CreatePersonDTO.parseAsync(req.body)

      await createPersonUseCase.execute(payload)

      return reply.status(201).send()
    } catch (error) {
      return ParsedError.toResponse({ error, reply })
    }
  }
}
