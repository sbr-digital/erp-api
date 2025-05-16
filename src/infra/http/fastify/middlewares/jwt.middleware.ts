import fastifyJwt from '@fastify/jwt'
import { FastifyInstance } from 'fastify'
import { readFileSync } from 'node:fs'

import { JWT } from '@/constants'
import { env } from '@/infra/env'
import { Middleware } from '@/interfaces'

export class JwtMiddleware implements Middleware {
  apply(instance: FastifyInstance) {
    const privateKey = readFileSync(env.PRIVATE_KEY)
    const publicKey = readFileSync(env.PUBLIC_KEY)

    instance.register(fastifyJwt, {
      cookie: {
        cookieName: JWT.TYPE.REFRESH_TOKEN,
        signed: false,
      },
      secret: {
        private: {
          key: privateKey,
          passphrase: env.PASSPHRASE,
        },
        public: publicKey,
      },
      sign: { algorithm: 'RS256' },
    })
  }
}
