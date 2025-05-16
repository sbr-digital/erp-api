import { FastifyInstance } from 'fastify'

import { PATHS } from '@/constants'
import { verifyToken } from '@/infra/http/fastify'

import { CreateUserController } from '../controllers/create-user.controller'
import { ListUserInfoController } from '../controllers/list-user-info.controller'

export async function userRoutes(server: FastifyInstance) {
  const createUserController = new CreateUserController()
  const listUserInfoController = new ListUserInfoController()

  server.get<{ Querystring: { id?: string } }>(
    PATHS.USERS.LIST_INFO,
    { onRequest: [verifyToken] },
    listUserInfoController.handle.bind(listUserInfoController),
  )

  server.post(
    PATHS.USERS.CREATE,
    createUserController.handle.bind(createUserController),
  )
}
