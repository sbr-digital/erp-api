import { inject, injectable } from 'tsyringe'

import { CONTAINER } from '@/constants'

import { IAddressRepository } from '../../domain'
import { CreateAddressInput } from '../../dtos'

interface CreateAddressOutput extends CreateAddressInput {}

@injectable()
export class CreateAddressUseCase {
  constructor(
    @inject(CONTAINER.REPOSITORIES.ADDRESS)
    private addressRepository: IAddressRepository,
  ) {}

  async execute({
    country,
    state,
    city,
    zipCode,
    street,
    number,
    district,
    details,
  }: CreateAddressInput): Promise<CreateAddressOutput> {
    const newAddress = await this.addressRepository.save({
      country,
      state,
      city,
      zipCode,
      street,
      number,
      district,
      details,
    })

    return newAddress as CreateAddressOutput
  }
}
