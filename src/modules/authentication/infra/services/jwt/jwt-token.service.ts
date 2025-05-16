import { FastifyRequest, FastifyReply } from 'fastify'
import { inject, injectable } from 'tsyringe'

import { CONTAINER } from '@/constants'
import { AuthenticationError } from '@/errors'

import { IJwtTokenService } from '../../../domain'

@injectable()
export class FastifyJwtTokenService implements IJwtTokenService {
  constructor(
    @inject(CONTAINER.HTTP.REQUEST)
    private readonly req: FastifyRequest,
    @inject(CONTAINER.HTTP.REPLY)
    private readonly reply: FastifyReply,
  ) {}

  async generateToken(payload: object, expiresIn: string): Promise<string> {
    return this.reply.jwtSign(payload, {
      expiresIn,
    })
  }

  async verifyToken(): Promise<void> {
    try {
      await this.req.jwtVerify()
    } catch (error) {
      throw new AuthenticationError({ resource: 'verifyToken' })
    }
  }
}
