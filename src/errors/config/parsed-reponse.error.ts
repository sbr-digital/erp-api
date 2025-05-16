import { FastifyReply } from 'fastify'
import { ZodError } from 'zod'

import { IFastifyError } from '@/interfaces'

import { parsedZodErrors } from './parsed-zod-reponse.error'

interface IParsedResponseError {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: Error | IFastifyError | any
  reply: FastifyReply
}

export class ParsedError {
  static toResponse({ error, reply }: IParsedResponseError): FastifyReply {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: parsedZodErrors(error.errors),
      })
    }

    if (error && error.statusCode < 500)
      return reply.status(error.statusCode).send(error.message)

    return reply.status(500).send({
      message: 'Internal service error',
      error: error.toString() || JSON.stringify(error),
    })
  }
}
