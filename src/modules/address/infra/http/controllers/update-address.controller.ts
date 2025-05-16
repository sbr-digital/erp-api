import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { ParsedError } from '@/errors'

import { UpdateAddressUseCase } from '../../../application/use-cases'
import { UpdateAddressDTO } from '../../../dtos'

export class UpdateAddressController {
  async handle(
    req: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const updateAddressUseCase = container.resolve(UpdateAddressUseCase)

      const { id } = req.params as { id: string }

      const payload = await UpdateAddressDTO.parseAsync({
        id,
        ...req.body!,
      })

      await updateAddressUseCase.execute(payload)

      return reply.status(204).send()
    } catch (error) {
      return ParsedError.toResponse({ error, reply })
    }
  }
}
