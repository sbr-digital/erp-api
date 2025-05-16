import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { ParsedError } from '@/errors'

import { ListPeopleUseCase } from '../../../../application/use-cases'
import { ListPeopleDTO } from '../../../../dtos'

export class ListPeopleController {
  async handle(
    req: FastifyRequest<{
      Querystring: { name?: string; page?: string; pageSize?: string }
    }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const listPeopleUseCase = container.resolve(ListPeopleUseCase)

      const {
        query: { name, page, pageSize },
      } = await ListPeopleDTO.parseAsync({
        query: req.query,
      })

      const people = await listPeopleUseCase.execute({
        name,
        page,
        pageSize,
      })

      return reply.status(200).send(people)
    } catch (error) {
      return ParsedError.toResponse({ error, reply })
    }
  }
}
