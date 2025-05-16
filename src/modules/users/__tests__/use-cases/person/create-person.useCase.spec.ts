import { VALID_CPF } from '@/constants'
import { CreateUserConflictError } from '@/errors'
import { MockNodeCacheService, MockPasswordService } from '@/infra/services'
import { InMemoryAddressRepository } from '@/modules/address/infra/database'

import { fakePeople } from './../../mocks/fake-people'
import { fakeUsers } from '../../mocks/fake-users'
import { CreatePersonUseCase } from '../../../application/use-cases'
import {
  InMemoryPersonRepository,
  InMemoryUserRepository,
} from '../../../infra/database'

describe('CreatePersonUseCase', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let payload: any

  let personRepository: InMemoryPersonRepository
  let userRepository: InMemoryUserRepository
  let addressRepository: InMemoryAddressRepository
  let createPersonUseCase: CreatePersonUseCase

  beforeEach(() => {
    personRepository = new InMemoryPersonRepository()
    userRepository = new InMemoryUserRepository()
    addressRepository = new InMemoryAddressRepository()
    const passwordService = new MockPasswordService()
    const cacheService = new MockNodeCacheService()

    createPersonUseCase = new CreatePersonUseCase(
      personRepository,
      userRepository,
      addressRepository,
      passwordService,
      cacheService,
    )

    payload = {
      name: 'fake name',
      email: undefined,
      documentNumber: VALID_CPF[0],
      documentType: 'CPF',
      birthday: new Date('2021-01-01'),
      phoneNumber: '55999999999',
      address: {
        country: 'country',
        state: 'state',
        city: 'city',
        zipCode: 'zipCode',
        street: 'street',
        number: '1',
        district: 'district',
      },
    }
  })

  it('should be possible to create a new person with correct payload', async () => {
    await createPersonUseCase.execute(payload)

    const result = fakePeople.find((person) => person.name === 'fake name')

    expect(result).toEqual(
      expect.objectContaining({
        name: 'fake name',
        documentNumber: VALID_CPF[0],
      }),
    )
  })

  it('sould be possible to create a new person and user if email is valid', async () => {
    payload.email = 'valid@email.test.com.br'
    payload.name = 'other person'
    await createPersonUseCase.execute(payload)

    const result = fakePeople.find((person) => person.name === 'other person')

    const user = fakeUsers.find(
      (user) => user.email === 'valid@email.test.com.br',
    )

    expect(result).toEqual(
      expect.objectContaining({
        name: 'other person',
        documentNumber: VALID_CPF[0],
      }),
    )

    expect(user).toEqual(
      expect.objectContaining({
        name: 'other person',
        email: 'valid@email.test.com.br',
        password: expect.any(String),
        role: 'ASSOCIATE',
      }),
    )
  })

  it('should not be possible to create a new person if emails already exists', async () => {
    payload.email = 'valid@email.test.com.br'

    await expect(() =>
      createPersonUseCase.execute(payload),
    ).rejects.toBeInstanceOf(CreateUserConflictError)
  })

  it('should be possible to create a new person without attributes non required', async () => {
    payload.phoneNumber = undefined
    payload.email = undefined
    payload.name = 'valid name without attributes'

    await createPersonUseCase.execute(payload)

    const result = fakePeople.find(
      (person) => person.name === 'valid name without attributes',
    )

    expect(result).toEqual(
      expect.objectContaining({
        name: 'valid name without attributes',
        documentNumber: VALID_CPF[0],
        phoneNumber: undefined,
      }),
    )
  })
})
