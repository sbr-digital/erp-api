import { inject, injectable } from 'tsyringe'

import { CONTAINER } from '@/constants'
import { CreateUserConflictError } from '@/errors'
import { IPasswordService } from '@/interfaces'

import { IUserRepository } from '../../domain'
import { CreateUserInput } from '../../dtos'

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject(CONTAINER.REPOSITORIES.USERS)
    private userRepository: IUserRepository,
    @inject(CONTAINER.SERVICES.PASSWORD)
    private passwordService: IPasswordService,
  ) {}

  async execute({
    name,
    email,
    password,
    role,
  }: CreateUserInput): Promise<void> {
    const userWithSameEmail = await this.userRepository.findByEmail({
      email,
    })

    if (userWithSameEmail) {
      throw new CreateUserConflictError({
        contex: 'CreateUserUseCase',
        data: { email },
      })
    }

    const hashedPassword = await this.passwordService.hashPassword(password)

    await this.userRepository.save({
      name,
      email,
      password: hashedPassword,
      role,
    })
  }
}
