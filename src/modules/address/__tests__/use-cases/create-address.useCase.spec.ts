import { CreateAddressUseCase } from '../../application/use-cases'
import { InMemoryAddressRepository } from '../../infra/database'

describe('CreateAddressUseCase', () => {
  let addressRepository: InMemoryAddressRepository
  let createAddressUsecase: CreateAddressUseCase

  beforeEach(() => {
    addressRepository = new InMemoryAddressRepository()
    createAddressUsecase = new CreateAddressUseCase(addressRepository)
  })

  const payload = {
    country: 'country',
    state: 'state',
    city: 'city',
    zipCode: 'zipCode',
    street: 'street',
    number: '1',
    district: 'district',
  }

  it('should be possible to create new address with correct payload', async () => {
    const address = await createAddressUsecase.execute({
      ...payload,
      details: 'details',
    })

    expect(address).toBeTruthy()
    expect(address).toEqual(expect.objectContaining(payload))
  })

  it('should be possible to create new address without details', async () => {
    const address = await createAddressUsecase.execute({
      ...payload,
    })

    expect(address).toBeTruthy()
    expect(address.details).toBeUndefined()
  })
})
