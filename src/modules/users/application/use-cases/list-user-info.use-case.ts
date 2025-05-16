import { inject, injectable } from 'tsyringe'

import { CONTAINER } from '@/constants'
import { UserNotFoundError } from '@/errors'
import { removeObjectKeys } from '@/modules/utils'

import { IPersonRepository, IUserRepository, User } from '../../domain'
import { PeopleWithAddressAndEmailResponse } from '../../domain/types/people.types'

interface UserOutput extends Omit<User, 'password'> {}
@injectable()
export class ListUserInfoUseCase {
  constructor(
    @inject(CONTAINER.REPOSITORIES.USERS)
    private userRepository: IUserRepository,
    @inject(CONTAINER.REPOSITORIES.PERSON)
    private personRepository: IPersonRepository,
  ) {}

  async execute({
    userId,
  }: {
    userId: string
  }): Promise<UserOutput | PeopleWithAddressAndEmailResponse> {
    const user = await this.userRepository.findByUserID({
      id: userId,
    })

    if (!user) {
      throw new UserNotFoundError({
        contex: 'ListUserInfoUseCase',
        data: { userId },
      })
    }

    if (user?.role === 'ASSOCIATE') {
      const people = await this.personRepository.findByUserID({
        userId,
      })

      return { ...people, email: user.email }
    }

    return removeObjectKeys(user!, ['password'])
  }
}
