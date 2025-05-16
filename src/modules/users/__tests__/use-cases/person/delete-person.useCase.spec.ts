import { UserNotFoundError } from '@/errors'
import { MockNodeCacheService } from '@/infra/services'
import { fakeAddress } from '@/modules/address/__tests__/mocks/fake-address'
import { InMemoryAddressRepository } from '@/modules/address/infra/database'

import { fakePeople } from '../../mocks/fake-people'
import { DeletePersonUseCase } from '../../../application/use-cases'
import {
  InMemoryPersonRepository,
  InMemoryUserRepository,
} from '../../../infra/database'
import { fakeUsers } from '../../mocks/fake-users'

describe('DeletePersonUseCase', () => {
  let personRepository: InMemoryPersonRepository
  let addressRepository: InMemoryAddressRepository
  let usersRepository: InMemoryUserRepository
  let cacheService: MockNodeCacheService<void>
  let deletePersonUseCase: DeletePersonUseCase

  beforeEach(() => {
    personRepository = new InMemoryPersonRepository()
    addressRepository = new InMemoryAddressRepository()
    usersRepository = new InMemoryUserRepository()
    cacheService = new MockNodeCacheService()
    deletePersonUseCase = new DeletePersonUseCase(
      personRepository,
      addressRepository,
      usersRepository,
      cacheService,
    )
  })

  it('should be possible to delete a person', async () => {
    const person = fakePeople[0]

    await deletePersonUseCase.execute({
      id: person.id,
    })

    const result = fakePeople.find(
      (person_) => person_.id === person.id && person_.enable,
    )

    expect(result).toBeUndefined()

    const addressResult = fakeAddress.find(
      (address) => address.id === person.addressId && address.enable,
    )

    expect(addressResult).toBeUndefined()

    const userResult = fakeUsers.find(
      (user) => user.id === person.userId && user.enable,
    )

    expect(userResult).toBeUndefined()
  })

  it('should not be possible to delete a person that does not exist', async () => {
    await expect(() =>
      deletePersonUseCase.execute({
        id: 1000,
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
