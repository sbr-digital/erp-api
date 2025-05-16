import { FastifyRequest, FastifyReply } from 'fastify'

import { ErrorHandler } from '@/interfaces'

import { CustomError } from './custom.error'

export class FastifyErrorHandler implements ErrorHandler {
  handle(error: Error, request: FastifyRequest, reply: FastifyReply): void {
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message })
    } else {
      console.log(error)
      reply.status(500).send({ message: 'Internal Server Error' })
    }
  }
}
