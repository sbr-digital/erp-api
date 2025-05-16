import { AddressNotFoundError } from '@/errors'

import { UpdateAddressUseCase } from '../../application/use-cases'
import { InMemoryAddressRepository } from '../../infra/database'

describe('UpdateAddressUseCase', () => {
  let addressRepository: InMemoryAddressRepository
  let updateAddressUseCase: UpdateAddressUseCase

  beforeEach(() => {
    addressRepository = new InMemoryAddressRepository()
    updateAddressUseCase = new UpdateAddressUseCase(addressRepository)
  })

  const payload = {
    country: 'updated country',
    state: 'updated state',
    zipCode: 'updatedzipCode',
    street: 'updated street',
    number: '100',
    district: 'updated district',
  }

  it('should be possible to update address if id is valid', async () => {
    await updateAddressUseCase.execute({
      id: 1,
      ...payload,
    })

    const result = await addressRepository.findByID({ id: 1 })

    expect(result).toEqual(
      expect.objectContaining({
        country: 'updated country',
        state: 'updated state',
        zip_code: 'updatedzipCode',
        street: 'updated street',
        number: '100',
        district: 'updated district',
      }),
    )
  })

  it('Should be possible to update the address if the id is valid and only one attribute by sent', async () => {
    await updateAddressUseCase.execute({
      id: 1,
      street: 'updated new address',
    })

    const result = await addressRepository.findByID({ id: 1 })

    expect(result).toEqual(
      expect.objectContaining({ street: 'updated new address' }),
    )
  })

  it('should not be possible to update address if id is not valid', async () => {
    await expect(
      updateAddressUseCase.execute({
        id: 999,
        ...payload,
      }),
    ).rejects.toBeInstanceOf(AddressNotFoundError)
  })
})
