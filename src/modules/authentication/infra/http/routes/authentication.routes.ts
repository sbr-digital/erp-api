import { FastifyInstance } from 'fastify'

import { PATHS } from '@/constants'

import { AuthenticationController } from '../controllers/create-authentication.controller'

export async function authenticationRoutes(server: FastifyInstance) {
  const authenticationController = new AuthenticationController()

  server.post(
    PATHS.SIGN_IN,
    authenticationController.handle.bind(authenticationController),
  )
}
