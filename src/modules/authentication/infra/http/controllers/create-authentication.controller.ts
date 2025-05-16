import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { JWT } from '@/constants'
import { ParsedError } from '@/errors'
import { env } from '@/infra'

import { AuthenticationUseCase } from '../../../application/use-cases'
import { AuthenticationDTO } from '../../../dtos'

export class AuthenticationController {
  async handle(
    req: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const authenticateUseCase = container.resolve(AuthenticationUseCase)

      const { email, password } = await AuthenticationDTO.parseAsync(req.body)

      const { token, refreshToken } = await authenticateUseCase.execute({
        email,
        password,
      })

      return reply
        .setCookie(JWT.TYPE.REFRESH_TOKEN, refreshToken, {
          path: '/',
          secure: env.NODE_ENV !== 'local',
          sameSite: true,
          httpOnly: true,
        })
        .send({ token })
    } catch (error) {
      return ParsedError.toResponse({ error, reply })
    }
  }
}
