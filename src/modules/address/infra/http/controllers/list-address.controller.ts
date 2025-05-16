import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { ParsedError } from '@/errors'

import { ListAddressUseCase } from '../../../application/use-cases'
import { ListAddressDTO } from '../../../dtos'

export class ListAddressController {
  async handle(
    req: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const listAddressUseCase = container.resolve(ListAddressUseCase)

      const { id } = await ListAddressDTO.parseAsync(req.params)

      const address = await listAddressUseCase.execute({
        id,
      })

      return reply.status(200).send({ address })
    } catch (error) {
      return ParsedError.toResponse({ error, reply })
    }
  }
}
