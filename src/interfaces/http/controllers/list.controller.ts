import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodSchema } from 'zod'

import { ParsedError } from '@/errors'

interface UseCaseWithExecute<Input, Output> {
  execute(input: Input): Promise<Output>
}

export class BaseListController<
  Input,
  Output,
  UseCase extends UseCaseWithExecute<Input, Output>,
  DTO extends ZodSchema,
> {
  constructor(
    private useCaseInstance: UseCase,
    private dtoClass: DTO,
  ) {}

  async handle(
    req: FastifyRequest<{
      Querystring: {
        name?: string | undefined
        page?: number
        pageSize?: number
      }
    }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const { name, page, pageSize } = await this.dtoClass.parseAsync(req.query)

      const result = await this.useCaseInstance.execute({
        name,
        page,
        pageSize,
      } as Input)

      return reply.status(200).send(result)
    } catch (error) {
      return ParsedError.toResponse({ error, reply })
    }
  }
}
