import { inject, injectable } from 'tsyringe'

import { CONTAINER } from '@/constants'
import { AddressNotFoundError, DeleteResourceError } from '@/errors'
import { IPersonRepository } from '@/modules/users/domain'

import { IAddressRepository } from '../../domain'

interface DeleteAddressInput {
  id: number
}

@injectable()
export class DeleteAddressUseCase {
  constructor(
    @inject(CONTAINER.REPOSITORIES.ADDRESS)
    private addressRepository: IAddressRepository,
    @inject(CONTAINER.REPOSITORIES.PERSON)
    private personRepository: IPersonRepository,
  ) {}

  async execute({ id }: DeleteAddressInput): Promise<void> {
    const address = await this.addressRepository.findByID({ id })

    if (!address) {
      throw new AddressNotFoundError({
        resource: 'DeleteAddressUseCase',
        data: { id },
      })
    }

    const person = await this.personRepository.findByAddressId({
      addressId: address.id,
    })

    if (person) {
      throw new DeleteResourceError({
        resource: 'DeleteAddressUseCase',
        data: {
          addressId: address.id,
          person: {
            id: person.id,
            name: person.name,
            enable: person.enable,
          },
        },
      })
    }

    await this.addressRepository.delete({ id })
  }
}
