import { FastifyInstance } from 'fastify'

import { PATHS } from '@/constants'

import { ListPersonInfoController } from '../controllers/person/list-person-info.controller'
import { CreatePersonController } from '../controllers/person/create-person.controller'
import { ListPeopleController } from '../controllers/person/list-people.controller'
import { DeletePersonController } from '../controllers/person/delete-person.controller'
import { UpdatePersonController } from '../controllers/person/update-person.controller'

export async function personRoutes(server: FastifyInstance) {
  const listPersonInfoController = new ListPersonInfoController()
  const createPersonController = new CreatePersonController()
  const deletePersonController = new DeletePersonController()
  const listPeopleController = new ListPeopleController()
  const updatePersonController = new UpdatePersonController()

  server.get<{
    Querystring: { name?: string; page?: string; pageSize?: string }
  }>(
    PATHS.PERSON.LIST_ALL,
    listPeopleController.handle.bind(listPeopleController),
  )

  server.get(
    PATHS.PERSON.INFO,
    listPersonInfoController.handle.bind(listPersonInfoController),
  )

  server.post(
    PATHS.PERSON.CREATE,
    createPersonController.handle.bind(createPersonController),
  )

  server.put(
    PATHS.PERSON.UPDATE,
    updatePersonController.handle.bind(updatePersonController),
  )

  server.delete(
    PATHS.PERSON.DELETE,
    deletePersonController.handle.bind(deletePersonController),
  )
}
