import { Count, Delete, FindByID } from '@/core/types/Generic.types'
import { prisma } from '@/infra/database/prisma'

import { PersonDatabaseAdapter, PersonDomainAdapter } from '../adapters'
import { IPersonRepository, Person } from '../../../domain'
import {
  ListAll,
  FindByName,
  PeopleWithAddressAndEmailResponse,
  ListPaginatedPeople,
  FindByUserID,
  FindByAddressID,
} from '../../../domain/types/people.types'

export class PrismaPersonRepository implements IPersonRepository {
  async count({ name }: Count): Promise<number> {
    return prisma.people.count({
      where: {
        enable: true,
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    })
  }

  async save(person: Person): Promise<PeopleWithAddressAndEmailResponse> {
    const dbData = PersonDomainAdapter.toDatabase(person)

    const createPerson = await prisma.people.create({
      data: dbData,
      include: {
        address: true,
        user: true,
      },
    })

    return PersonDatabaseAdapter.toDomain(createPerson)!
  }

  async update(person: Person): Promise<void> {
    const dbData = PersonDomainAdapter.toDatabase(person)

    await prisma.people.update({
      where: { id: dbData.id, enable: true },
      data: dbData,
    })
  }

  async listAll({
    name,
    page,
    pageSize,
  }: ListAll): Promise<ListPaginatedPeople> {
    const result = await prisma.people.findMany({
      where: {
        enable: true,
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      include: {
        address: true,
        user: true,
      },
      take: pageSize,
      skip: page,
      orderBy: { name: 'asc' },
    })

    const people = PersonDatabaseAdapter.toDomainList(result)

    const total = await this.count({ name })

    return { people, total }
  }

  async findByUserID({
    userId,
  }: FindByUserID): Promise<PeopleWithAddressAndEmailResponse> {
    const person = await prisma.people.findFirst({
      where: { user_id: userId, enable: true },
      include: {
        address: true,
        user: true,
      },
    })

    return PersonDatabaseAdapter.toDomain(person)!
  }

  async findByPersonID({
    id,
  }: FindByID): Promise<PeopleWithAddressAndEmailResponse | null> {
    const person = await prisma.people.findFirst({
      where: { id, enable: true },
      include: {
        address: true,
        user: true,
      },
    })

    return PersonDatabaseAdapter.toDomain(person)!
  }

  async findByID({
    id,
  }: FindByID): Promise<PeopleWithAddressAndEmailResponse | null> {
    const person = await prisma.people.findFirst({
      where: { id, enable: true },
      include: {
        address: true,
        user: true,
      },
    })

    return PersonDatabaseAdapter.toDomain(person)
  }

  // TO DO ALTERAR NOME DO METODO
  async findByName({
    name,
  }: FindByName): Promise<[] | PeopleWithAddressAndEmailResponse[]> {
    const people = await prisma.people.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
        enable: true,
      },
      include: {
        address: true,
        user: true,
      },
    })

    return PersonDatabaseAdapter.toDomainList(people)
  }

  async findByAddressId({
    addressId,
  }: FindByAddressID): Promise<Person | null> {
    const person = await prisma.people.findFirst({
      where: {
        address_id: addressId,
        enable: true,
      },
      include: {
        address: true,
        user: true,
      },
    })

    return PersonDatabaseAdapter.toDomain(person)
  }

  async delete({ id }: Delete): Promise<void> {
    await prisma.people.update({
      where: { id, enable: true },
      data: { enable: false, updated_at: new Date() },
    })
  }
}
