import { inject, injectable } from 'tsyringe'

import { CONTAINER } from '@/constants'

import { IAddressRepository } from '../../domain'

interface ListAddressInput {
  id: number
}

interface ListAddressOutput {
  id: number | undefined
  country: string
  enable: boolean
  street: string
  number: string
  details?: string | null | undefined
  city: string
  state: string
  zipCode: string
  district: string
}

@injectable()
export class ListAddressUseCase {
  constructor(
    @inject(CONTAINER.REPOSITORIES.ADDRESS)
    private addressRepository: IAddressRepository,
  ) {}

  async execute({ id }: ListAddressInput): Promise<ListAddressOutput | null> {
    return this.addressRepository.findByID({ id }) || null
  }
}
