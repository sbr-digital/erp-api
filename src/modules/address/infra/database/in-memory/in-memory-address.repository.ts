import { fakeAddress } from '@/modules/address/__tests__/mocks/fake-address'

import { IAddressRepository, Address } from '../../../domain'
import { AddressDomainAdapter } from '../adapters'
import {
  DeleteAddress,
  FindAddressById,
} from '@/modules/address/domain/types/address.types'

export class InMemoryAddressRepository implements IAddressRepository {
  async count(): Promise<number> {
    return fakeAddress.filter((address) => address.enable).length
  }

  async save(address: Address): Promise<Address> {
    const id = fakeAddress.length + 1

    const createAddress = {
      ...address,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    fakeAddress.push(createAddress)

    return fakeAddress[fakeAddress.length - 1]
  }

  async update({
    id,
    street,
    enable,
    number,
    district,
    city,
    state,
    zipCode,
    details,
    country,
  }: Address): Promise<void> {
    const index = fakeAddress.findIndex(
      (address_) => address_.id === id && address_.enable,
    )

    const dbData = AddressDomainAdapter.toDatabase({
      id,
      enable,
      street,
      number,
      district,
      city,
      state,
      zipCode,
      details,
      country,
    })

    fakeAddress[index] = {
      ...fakeAddress[index],
      ...dbData,
      updatedAt: new Date(),
    }
  }

  async findByID({ id }: FindAddressById): Promise<Address | null> {
    return (
      fakeAddress.find(
        (address) => address.id === id && address.enable === true,
      ) || null
    )
  }

  async delete({ id }: DeleteAddress): Promise<void> {
    const index = fakeAddress.findIndex(
      (address) => address.id === id && address.enable,
    )

    fakeAddress[index] = {
      ...fakeAddress[index],
      updatedAt: new Date(),
      enable: false,
    }
  }
}
