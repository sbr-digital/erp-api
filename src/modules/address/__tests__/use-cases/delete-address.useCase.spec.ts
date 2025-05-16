import { AddressNotFoundError, DeleteResourceError } from '@/errors'
import { InMemoryPersonRepository } from '@/modules/users/infra/database'

import { DeleteAddressUseCase } from '../../application/use-cases'
import { InMemoryAddressRepository } from '../../infra/database'

describe('DeleteAddressUseCase', () => {
  let addressRepository: InMemoryAddressRepository
  let personRepository: InMemoryPersonRepository
  let deleteAddressUseCase: DeleteAddressUseCase

  beforeEach(() => {
    addressRepository = new InMemoryAddressRepository()
    personRepository = new InMemoryPersonRepository()

    deleteAddressUseCase = new DeleteAddressUseCase(
      addressRepository,
      personRepository,
    )
  })

  it('should be possible to delete address if id is valid', async () => {
    await deleteAddressUseCase.execute({
      id: 4,
    })

    const validResult = await addressRepository.findByID({
      id: 4,
    })

    expect(validResult).toEqual(null)
  })

  it('should not be possible to delete address if enable person with address', async () => {
    await expect(
      deleteAddressUseCase.execute({
        id: 1,
      }),
    ).rejects.toBeInstanceOf(DeleteResourceError)
  })

  it('should not be possible to delete address if id is not valid', async () => {
    await expect(
      deleteAddressUseCase.execute({
        id: 999,
      }),
    ).rejects.toBeInstanceOf(AddressNotFoundError)
  })
})
