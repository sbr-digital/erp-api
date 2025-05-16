import { FastifyInstance } from 'fastify'

import { PATHS } from '@/constants'

import { CreateAddressController } from '../controllers/create-address.controller'
import { DeleteAddressController } from '../controllers/delete-address.controller'
import { ListAddressController } from '../controllers/list-address.controller'
import { UpdateAddressController } from '../controllers/update-address.controller'

export async function addressRoutes(server: FastifyInstance) {
  const createAddressController = new CreateAddressController()
  const deleteAddressController = new DeleteAddressController()
  const listAddressController = new ListAddressController()
  const updateAddressController = new UpdateAddressController()

  server.get(
    PATHS.ADDRESS.LIST,
    listAddressController.handle.bind(listAddressController),
  )

  server.post(
    PATHS.ADDRESS.CREATE,
    createAddressController.handle.bind(createAddressController),
  )

  server.put(
    PATHS.ADDRESS.UPDATE,
    updateAddressController.handle.bind(updateAddressController),
  )

  server.delete<{ Querystring: { year: string } }>(
    PATHS.ADDRESS.DELETE,
    deleteAddressController.handle.bind(deleteAddressController),
  )
}
