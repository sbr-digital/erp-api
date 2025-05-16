import { prisma } from '@/infra/database/prisma'

import { AddressDatabaseAdapter, AddressDomainAdapter } from '../adapters'
import { IAddressRepository, Address } from '../../../domain'
import {
  DeleteAddress,
  FindAddressById,
} from '@/modules/address/domain/types/address.types'

export class PrismaAddressRepository implements IAddressRepository {
  async count(): Promise<number> {
    return prisma.address.count({ where: { enable: true } })
  }

  async save(address: Address): Promise<Address> {
    const dbData = AddressDomainAdapter.toDatabase(address)

    const result = await prisma.address.create({ data: dbData })

    return AddressDatabaseAdapter.toDomain(result)
  }

  async update(address: Address): Promise<void> {
    const dbData = AddressDomainAdapter.toDatabase(address)

    await prisma.address.update({
      where: { id: dbData.id, enable: true },
      data: dbData,
    })
  }

  async findByID({ id }: FindAddressById): Promise<Address | null> {
    const address = await prisma.address.findFirst({
      where: { id, enable: true },
    })

    return address && AddressDatabaseAdapter.toDomain(address)
  }

  async delete({ id }: DeleteAddress): Promise<void> {
    await prisma.address.update({
      where: { id },
      data: { enable: false, updated_at: new Date() },
    })
  }
}
