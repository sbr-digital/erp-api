import { CreateUserConflictError } from '@/errors'
import { MockPasswordService } from '@/infra/services'

import { CreateUserUseCase } from '../../application/use-cases'
import { User } from '../../domain'
import { InMemoryUserRepository } from '../../infra/database'
import { fakeUsers } from '../mocks/fake-users'

let createUserUseCase: CreateUserUseCase
let usersRepository: InMemoryUserRepository

beforeEach(() => {
  usersRepository = new InMemoryUserRepository()
  const passwordService = new MockPasswordService()
  createUserUseCase = new CreateUserUseCase(usersRepository, passwordService)
})

describe('CreateUserUseCase', () => {
  it('should be possible to create a new  member user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'Password123!',
      role: 'MEMBER',
    }
    await createUserUseCase.execute(userData as User)

    const createdUser = fakeUsers.find(
      (item) => item.email === userData.email && item.enable,
    )

    expect(createdUser).toBeTruthy()
    expect(createdUser?.name).toBe(userData.name)
    expect(createdUser?.role).toBe(userData.role)
  })

  it('should be possible to create a new  admin user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe+admin@example.com',
      password: 'Password123!',
      role: 'ADMIN',
    } as User

    await createUserUseCase.execute(userData)

    const createdUser = await usersRepository.findByEmail({
      email: userData.email,
    })
    expect(createdUser).toBeTruthy()
    expect(createdUser?.role).toBe('ADMIN')
  })

  it('should be possible to created a user new user even if the password is not provided', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe-other@example.com',
      role: 'MEMBER',
    }

    await createUserUseCase.execute(userData as User)

    const createdUser = await usersRepository.findByEmail({
      email: userData.email,
    })
    expect(createdUser).toBeTruthy()
    expect(createdUser?.name).toBe(userData.name)
    expect(createdUser?.role).toBe(userData.role)
  })

  it('should not be possible to created a user with the same email', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'Password123!',
      role: 'MEMBER',
    } as User

    await expect(() =>
      createUserUseCase.execute(userData),
    ).rejects.toBeInstanceOf(CreateUserConflictError)
  })
})
