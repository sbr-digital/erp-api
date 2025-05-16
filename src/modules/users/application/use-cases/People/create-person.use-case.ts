import { inject, injectable } from 'tsyringe'

import { CACHE_KEYS, CONTAINER } from '@/constants'
import { ICacheService } from '@/core/domain'
import { CreateUserConflictError } from '@/errors'
import { IPasswordService } from '@/interfaces'
import { IAddressRepository } from '@/modules/address/domain'

import { IPersonRepository, IUserRepository, Password } from '../../../domain'
import { CreatePersonInput } from '../../../dtos'

@injectable()
export class CreatePersonUseCase {
  constructor(
    @inject(CONTAINER.REPOSITORIES.PERSON)
    private personRepository: IPersonRepository,
    @inject(CONTAINER.REPOSITORIES.USERS)
    private userRepository: IUserRepository,
    @inject(CONTAINER.REPOSITORIES.ADDRESS)
    private addressRepository: IAddressRepository,
    @inject(CONTAINER.SERVICES.PASSWORD)
    private passwordService: IPasswordService,
    @inject(CONTAINER.SERVICES.CACHE)
    private cacheService: ICacheService<void>,
  ) {}

  async execute({
    address,
    email,
    name,
    birthday,
    documentNumber,
    documentType,
    phoneNumber,
    details,
  }: CreatePersonInput): Promise<void> {
    if (email) {
      const userWithSameEmail = await this.userRepository.findByEmail({
        email,
      })

      if (userWithSameEmail) {
        throw new CreateUserConflictError({
          contex: 'CreatePersonUseCase',
          data: { email },
        })
      }

      const password = Password.generate()
      const hashedPassword = await this.passwordService.hashPassword(password)

      await this.userRepository.save({
        name,
        email,
        password: hashedPassword,
        role: 'ASSOCIATE',
      })
    }

    const { id: addressId } = await this.addressRepository.save(address)

    const userId =
      (email &&
        (await this.userRepository
          .findByEmail({ email })
          .then((user) => user?.id))) ||
      null

    const newPerson = {
      name,
      documentType,
      documentNumber,
      birthday,
      phoneNumber,
      details,
      userId,
      addressId,
    }

    await this.personRepository.save(newPerson)

    this.cacheService.delete(CACHE_KEYS.PERSON)
  }
}
