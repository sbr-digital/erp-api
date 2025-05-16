import { inject, injectable } from 'tsyringe'

import { CONTAINER } from '@/constants'
import { AddressNotFoundError } from '@/errors'
import { filterUndefinedValues } from '@/modules/utils'

import { IAddressRepository } from '../../domain'
import { UpdateAddressInput } from '../../dtos'

@injectable()
export class UpdateAddressUseCase {
  constructor(
    @inject(CONTAINER.REPOSITORIES.ADDRESS)
    private addressRepository: IAddressRepository,
  ) {}

  async execute({
    id,
    country,
    state,
    city,
    zipCode,
    street,
    number,
    district,
    details,
  }: UpdateAddressInput): Promise<void> {
    const address = await this.addressRepository.findByID({ id })

    if (!address) {
      throw new AddressNotFoundError({
        resource: 'UpdateAddressUseCase',
        data: { id },
      })
    }

    const updateAddress = filterUndefinedValues({
      country,
      state,
      city,
      zipCode,
      street,
      number,
      district,
      details,
    })

    await this.addressRepository.update({ id, ...updateAddress })
  }
}
