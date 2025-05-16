import { inject, injectable } from 'tsyringe'

import { CONTAINER } from '@/constants'
import { AuthenticationError } from '@/errors'
import { IPasswordService } from '@/interfaces'
import { IUserRepository } from '@/modules/users/domain'

import {
  IAuthenticationRepository,
  IJwtTokenService,
  Authentication,
} from '../../domain'
import { AuthenticationUserInput } from '../../dtos'

interface AuthenticationUserOutput {
  token: string
  refreshToken: string
}

@injectable()
export class AuthenticationUseCase {
  constructor(
    @inject(CONTAINER.REPOSITORIES.USERS)
    private userRepository: IUserRepository,
    @inject(CONTAINER.SERVICES.PASSWORD)
    private passwordService: IPasswordService,
    @inject(CONTAINER.REPOSITORIES.AUTH)
    private authRepository: IAuthenticationRepository,
    @inject(CONTAINER.SERVICES.TOKEN)
    private tokenService: IJwtTokenService,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticationUserInput): Promise<AuthenticationUserOutput> {
    const user = await this.userRepository.findByEmail({ email })

    if (!user) {
      throw new AuthenticationError({
        resource: 'AuthenticationUseCase',
        data: { email },
      })
    }

    const passwordMatch = await this.passwordService.verifyPassword(
      password,
      user.password,
    )

    if (!passwordMatch) {
      throw new AuthenticationError({
        resource: 'AuthenticationUseCase',
        data: { email },
      })
    }

    const token = await this.tokenService.generateToken({ sub: user.id }, '1h')

    const refreshToken = await this.tokenService.generateToken(
      { sub: user.id },
      '7d',
    )

    await this.authRepository.save({
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    } as Authentication)

    return { token, refreshToken }
  }
}
