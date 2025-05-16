import { VALID_CPF } from '@/constants'
import { CreateUserConflictError, UserNotFoundError } from '@/errors'
import { MockNodeCacheService, MockPasswordService } from '@/infra/services'
import { fakeAddress } from '@/modules/address/__tests__/mocks/fake-address'
import { InMemoryAddressRepository } from '@/modules/address/infra/database'

import { fakePeople } from '../../mocks/fake-people'
import { fakeUsers } from '../../mocks/fake-users'
import { UpdatePersonUseCase } from '../../../application/use-cases'
import {
  InMemoryPersonRepository,
  InMemoryUserRepository,
} from '../../../infra/database'

describe('UpdatePersonUseCase', () => {
  let personRepository: InMemoryPersonRepository
  let addressRepository: InMemoryAddressRepository
  let usersRepository: InMemoryUserRepository
  let updatePersonUseCase: UpdatePersonUseCase

  beforeEach(() => {
    personRepository = new InMemoryPersonRepository()
    addressRepository = new InMemoryAddressRepository()
    usersRepository = new InMemoryUserRepository()
    const passwordService = new MockPasswordService()
    const cacheService = new MockNodeCacheService()
    updatePersonUseCase = new UpdatePersonUseCase(
      personRepository,
      addressRepository,
      usersRepository,
      passwordService,
      cacheService,
    )
  })

  it('should be possible to update a person', async () => {
    const person = fakePeople[0]

    await updatePersonUseCase.execute({
      id: person.id,
      documentNumber: VALID_CPF[4],
    })

    expect(fakePeople[0].documentNumber).toEqual(VALID_CPF[4])
  })

  it('should be possible to update a person with address', async () => {
    const person = fakePeople[0]

    await updatePersonUseCase.execute({
      id: person.id,
      address: {
        country: 'update country by person',
        state: 'update state by person',
        city: 'update city by person',
        zipCode: 'update zipCode by person',
        street: 'update street by person',
        number: 'update number by person',
        district: 'update district by person',
        details: 'update details by person',
      },
    })

    const addressResult = fakeAddress.find(
      (address) => address.id === person.addressId,
    )

    expect(addressResult).toEqual(
      expect.objectContaining({
        country: 'update country by person',
        state: 'update state by person',
        city: 'update city by person',
        zip_code: 'update zipCode by person',
        street: 'update street by person',
        number: 'update number by person',
        district: 'update district by person',
        details: 'update details by person',
      }),
    )
  })

  it('should be possible to update a person and user with name', async () => {
    const person = fakePeople[0]

    await updatePersonUseCase.execute({
      id: person.id,
      name: 'update name by person',
    })

    const userResult = fakeUsers.find((user) => user.id === person.userId)

    expect(fakePeople[0].name).toEqual('update name by person')
    expect(userResult).toEqual(
      expect.objectContaining({
        name: 'update name by person',
      }),
    )
  })

  it('should be possible to update a person email at the users base', async () => {
    const person = fakePeople[0]

    await updatePersonUseCase.execute({
      id: person.id,
      email: 'userbyemail@njaa.ong.br',
    })

    const userResult = fakeUsers.find((user) => user.id === person.userId)

    expect(userResult).toEqual(
      expect.objectContaining({
        email: 'userbyemail@njaa.ong.br',
      }),
    )
  })

  it('should not be possible to update a person email at the users base if it already exists', async () => {
    const person = fakePeople[0]

    await expect(() =>
      updatePersonUseCase.execute({
        id: person.id,
        email: fakeUsers[1].email,
      }),
    ).rejects.toBeInstanceOf(CreateUserConflictError)
  })

  it('should not be possible to update a person if it does not exists', async () => {
    await expect(() =>
      updatePersonUseCase.execute({ id: 99, documentNumber: VALID_CPF[4] }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
