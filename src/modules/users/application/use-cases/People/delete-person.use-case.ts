import { inject, injectable } from 'tsyringe'

import { CACHE_KEYS, CONTAINER } from '@/constants'
import { ICacheService } from '@/core/domain'
import { UserNotFoundError } from '@/errors'
import { IAddressRepository } from '@/modules/address/domain'

import { IPersonRepository, IUserRepository } from '../../../domain'
import { DeletePersonInput } from '../../../dtos'

@injectable()
export class DeletePersonUseCase {
  constructor(
    @inject(CONTAINER.REPOSITORIES.PERSON)
    private personRepository: IPersonRepository,
    @inject(CONTAINER.REPOSITORIES.ADDRESS)
    private addressRepository: IAddressRepository,
    @inject(CONTAINER.REPOSITORIES.USERS)
    private userRepository: IUserRepository,
    @inject(CONTAINER.SERVICES.CACHE)
    private cacheService: ICacheService<void>,
  ) {}

  async execute({ id }: DeletePersonInput): Promise<void> {
    const person = await this.personRepository.findByID({ id })

    if (!person) {
      throw new UserNotFoundError({
        contex: 'DeletePersonUseCase',
        data: { id },
      })
    }

    await Promise.all([
      this.personRepository.delete({ id }),
      this.addressRepository.delete({ id: person.addressId }),
    ])

    if (person.userId) {
      await this.userRepository.deleteByUserID({ id: person.userId })
    }

    this.cacheService.delete(CACHE_KEYS.PERSON)
  }
}
