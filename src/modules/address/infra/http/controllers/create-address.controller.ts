import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { ParsedError } from '@/errors'

import { CreateAddressUseCase } from '../../../application/use-cases'
import { CreateAddressDTO } from '../../../dtos'

export class CreateAddressController {
  async handle(
    req: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const createAddressUseCase = container.resolve(CreateAddressUseCase)

      const {
        country,
        state,
        city,
        district,
        street,
        number,
        zipCode,
        details,
      } = await CreateAddressDTO.parseAsync(req.body)

      await createAddressUseCase.execute({
        country,
        state,
        city,
        district,
        street,
        number,
        zipCode,
        details,
      })

      return reply.status(201).send()
    } catch (error) {
      return ParsedError.toResponse({ error, reply })
    }
  }
}
