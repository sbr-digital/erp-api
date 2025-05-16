import { inject, injectable } from 'tsyringe'

import { CACHE_KEYS, CONTAINER } from '@/constants'
import { ICacheService } from '@/core/domain'
import { CreateUserConflictError, UserNotFoundError } from '@/errors'
import { IPasswordService } from '@/interfaces'
import { IAddressRepository } from '@/modules/address/domain'

import { IPersonRepository, IUserRepository, Password } from '../../../domain'
import { UpdatePersonInput } from '../../../dtos'

@injectable()
export class UpdatePersonUseCase {
  constructor(
    @inject(CONTAINER.REPOSITORIES.PERSON)
    private personRepository: IPersonRepository,
    @inject(CONTAINER.REPOSITORIES.ADDRESS)
    private addressRepository: IAddressRepository,
    @inject(CONTAINER.REPOSITORIES.USERS)
    private usersRepository: IUserRepository,
    @inject(CONTAINER.SERVICES.PASSWORD)
    private passwordService: IPasswordService,
    @inject(CONTAINER.SERVICES.CACHE)
    private cacheService: ICacheService<void>,
  ) {}

  async execute(person: UpdatePersonInput): Promise<void> {
    const { id, email, name, address } = person

    const person_ = await this.personRepository.findByID({ id })

    if (!person_) {
      throw new UserNotFoundError({
        context: 'UpdatePersonUseCase',
        data: { id },
      })
    }

    if (email) {
      const userWithSameEmail = await this.usersRepository.findByEmail({
        email,
      })

      if (userWithSameEmail && person_.userId !== userWithSameEmail.id) {
        throw new CreateUserConflictError({
          context: 'UpdatePersonsUseCase',
          data: { email },
        })
      }

      if (!person_.userId) {
        const password = Password.generate()
        const hashedPassword = await this.passwordService.hashPassword(password)

        const { id: userId } = await this.usersRepository.save({
          name: name ?? person_.name,
          email,
          password: hashedPassword,
          role: 'ASSOCIATE',
        })

        await this.personRepository.update({ userId, id })
      } else {
        await this.usersRepository.update({
          id: person_.userId,
          email,
        })
      }
    }

    if (name && person_.userId) {
      await this.usersRepository.update({
        id: person_.userId,
        name,
      })
    }

    if (address) {
      await this.addressRepository.update({
        ...address,
        id: person_.addressId,
      })
    }

    await this.personRepository.update({
      ...person,
      userId: email === null ? null : person.userId,
    })

    this.cacheService.delete(CACHE_KEYS.PERSON)
  }
}
