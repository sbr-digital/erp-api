import { randomUUID } from 'crypto'

import { UserNotFoundError } from '@/errors'
import { removeObjectKeys } from '@/modules/utils'

import { fakeUsers } from '../mocks/fake-users'
import { ListUserInfoUseCase } from '../../application/use-cases'
import {
  InMemoryPersonRepository,
  InMemoryUserRepository,
} from '../../infra/database'

let userRepository: InMemoryUserRepository
let personRepository: InMemoryPersonRepository
let listUserInfoUseCase: ListUserInfoUseCase

beforeEach(() => {
  userRepository = new InMemoryUserRepository()
  personRepository = new InMemoryPersonRepository()
  listUserInfoUseCase = new ListUserInfoUseCase(
    userRepository,
    personRepository,
  )
})

describe('ListUserInfoUseCase', () => {
  it('should be possible to list user info with role MEMBER', async () => {
    const result = await listUserInfoUseCase.execute({
      userId: fakeUsers[0].id,
    })
    expect(result).toEqual(removeObjectKeys(fakeUsers[0], ['password']))
    expect(result).not.toHaveProperty('mothersName')
    expect(result).toEqual(
      expect.objectContaining({
        role: 'MEMBER',
      }),
    )
  })

  it('should be possible to list user info with role ADMIN', async () => {
    const result = await listUserInfoUseCase.execute({
      userId: fakeUsers[3].id,
    })

    expect(result).toEqual(removeObjectKeys(fakeUsers[3], ['password']))
    expect(result).not.toHaveProperty('address')
    expect(result).toEqual(
      expect.objectContaining({
        role: 'ADMIN',
      }),
    )
  })

  it('should be possible to list user info with role ASSOCIATE', async () => {
    const result = await listUserInfoUseCase.execute({
      userId: fakeUsers[1].id,
    })

    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        documentNumber: expect.any(String),
        documentType: expect.any(String),
        birthday: expect.any(Date),
        phoneNumber: expect.any(String),
        userId: expect.any(String),
        addressId: expect.any(Number),
        enable: expect.any(Boolean),
        address: {
          id: expect.any(Number),
          enable: expect.any(Boolean),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          street: expect.any(String),
          number: expect.any(String),
          district: expect.any(String),
          city: expect.any(String),
          state: expect.any(String),
          zipCode: expect.any(String),
          country: expect.any(String),
          details: expect.any(String),
        },
        email: expect.any(String),
      }),
    )
  })

  it('should be not possibe to list user info if user not found', async () => {
    expect(() =>
      listUserInfoUseCase.execute({
        userId: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
