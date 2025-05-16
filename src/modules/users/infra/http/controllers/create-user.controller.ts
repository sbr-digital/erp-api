import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { ParsedError } from '@/errors'

import { CreateUserUseCase } from '../../../application/use-cases'
import { CreateUserDTO } from '../../../dtos'

export class CreateUserController {
  async handle(
    req: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const createUserUseCase = container.resolve(CreateUserUseCase)

      const { email, name, password, role } = await CreateUserDTO.parseAsync(
        req.body,
      )

      await createUserUseCase.execute({ email, name, password, role })

      return reply.status(201).send()
    } catch (error) {
      return ParsedError.toResponse({ error, reply })
    }
  }
}
