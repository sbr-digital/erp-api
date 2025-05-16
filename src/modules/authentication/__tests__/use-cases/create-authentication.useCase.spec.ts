import { AuthenticationError } from '@/errors'
import { MockPasswordService } from '@/infra/services'
import { IPasswordService } from '@/interfaces'
import { fakeUsers } from '@/modules/users/__tests__/mocks/fake-users'
import { InMemoryUserRepository } from '@/modules/users/infra/database'

import { AuthenticationUseCase } from '../../application/use-cases'
import { IJwtTokenService, IAuthenticationRepository } from '../../domain'
import { InMemoryAuthenticationRepository } from '../../infra/database'
import { MockJwtTokenService } from '../../infra/services/jwt'

describe('AuthenticationUseCase', () => {
  let authenticationUseCase: AuthenticationUseCase
  let usersRepository: InMemoryUserRepository
  let authRepository: IAuthenticationRepository
  let tokenService: IJwtTokenService
  let passwordService: IPasswordService

  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    authRepository = new InMemoryAuthenticationRepository()
    passwordService = new MockPasswordService()
    tokenService = new MockJwtTokenService()

    authenticationUseCase = new AuthenticationUseCase(
      usersRepository,
      passwordService,
      authRepository,
      tokenService,
    )
  })

  it('should authenticate a user with correct credentials', async () => {
    const userData = {
      email: fakeUsers[0].email,
      password: fakeUsers[0].password,
    }

    const result = await authenticationUseCase.execute(userData)

    expect(result).toEqual({
      token: 'fake-token',
      refreshToken: 'fake-token',
    })
  })

  it('should throw an error if email is invalid', async () => {
    const userData = {
      email: 'invalid@email.com.br',
      password: fakeUsers[0].password,
    }

    await expect(() =>
      authenticationUseCase.execute(userData),
    ).rejects.toBeInstanceOf(AuthenticationError)
  })

  it('should throw an error if email is password', async () => {
    const userData = {
      email: fakeUsers[0].email,
      password: 'Invalid!12354',
    }

    await expect(() =>
      authenticationUseCase.execute(userData),
    ).rejects.toBeInstanceOf(AuthenticationError)
  })
})
