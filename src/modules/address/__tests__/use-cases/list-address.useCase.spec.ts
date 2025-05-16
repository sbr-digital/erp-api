import { fakeAddress } from '../mocks/fake-address'

import { ListAddressUseCase } from '../../application/use-cases'
import { InMemoryAddressRepository } from '../../infra/database'

describe('ListAddressUseCase', () => {
  let addressRepository: InMemoryAddressRepository
  let listAddressUseCase: ListAddressUseCase

  beforeEach(() => {
    addressRepository = new InMemoryAddressRepository()

    listAddressUseCase = new ListAddressUseCase(addressRepository)
  })

  it('should be possible to list address if id is valid', async () => {
    const results = await listAddressUseCase.execute({
      id: 1,
    })

    const validResult = fakeAddress.find((address) => address.id === 1)

    expect(results).toEqual(expect.objectContaining(validResult))
  })

  it('should be null if id is not valid', async () => {
    const results = await listAddressUseCase.execute({
      id: 999,
    })

    expect(results).toEqual(null)
  })
})
