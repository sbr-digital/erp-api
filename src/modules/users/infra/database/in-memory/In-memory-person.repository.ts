import { Count, Delete, FindByID } from '@/core/types/Generic.types'
import { fakeAddress } from '@/modules/address/__tests__/mocks/fake-address'
import { fakeUsers } from '@/modules/users/__tests__/mocks/fake-users'
import { filterUndefinedValues } from '@/modules/utils'

import { fakePeople } from '../../../__tests__/mocks/fake-people'
import { IPersonRepository, Person } from '../../../domain'
import {
  ListAll,
  FindByName,
  SavePerson,
  PeopleWithAddressAndEmailResponse,
  ListPaginatedPeople,
  FindByUserID,
  UpdatePerson,
  FindByAddressID,
} from '../../../domain/types/people.types'

export class InMemoryPersonRepository implements IPersonRepository {
  async count({ name }: Count): Promise<number> {
    if (name) {
      return fakePeople.filter(
        (person) =>
          person.enable &&
          person.name.toLowerCase().includes(name.toLowerCase()),
      ).length
    }

    return fakePeople.filter((person) => person.enable).length
  }

  async save(person: SavePerson): Promise<PeopleWithAddressAndEmailResponse> {
    const id = fakePeople.length + 1

    const createPerson = {
      ...person,
      createdAt: new Date(),
      updatedAt: new Date(),
      enable: true,
      id,
    }

    fakePeople.push(createPerson)

    const address = fakeAddress.find(
      (address_) => address_.id === person.addressId,
    )!
    const user = fakeUsers.find((user_) => user_.id === person.userId)

    return {
      ...createPerson,
      address: {
        street: address.street,
        number: address.number,
        district: address.district,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        country: address.country,
        details: address.details,
      },
      email: user?.email || null,
    }
  }

  async update(person: UpdatePerson): Promise<void> {
    const index = fakePeople.findIndex(
      (person_) => person_.id === person.id && person_.enable,
    )

    fakePeople[index] = {
      ...fakePeople[index],
      ...filterUndefinedValues(person),
      updatedAt: new Date(),
    }
  }

  async listAll({ name }: ListAll): Promise<ListPaginatedPeople> {
    const people_ = fakePeople.map((person) => {
      return {
        ...person,
        address: fakeAddress.find(
          (address_) => address_.id === person.addressId,
        )!,
        email: fakeUsers.find((user) => {
          if (person.userId) {
            return user.email
          }
          return null
        })! as unknown as string | null,
      }
    })

    const people = people_.filter((data) => data.enable)

    return {
      people: name
        ? people.filter((person) => person.name.includes(name))
        : people,
      total: people.length || 0,
    }
  }

  async findByID({ id }: FindByID): Promise<Person | null> {
    return (
      fakePeople.find((person) => person.id === id && person.enable) || null
    )
  }

  async findByUserID({
    userId,
  }: FindByUserID): Promise<PeopleWithAddressAndEmailResponse> {
    const person = fakePeople.find(
      (person) => person.userId === userId && person.enable,
    )!

    return {
      ...person,
      address: fakeAddress.find(
        (address_) => address_.id === person.addressId,
      )!,
      email: fakeUsers.find((user) => {
        if (person.userId) {
          return user.email
        }
        return null
      })! as unknown as string | null,
    }
  }

  async findByPersonID({
    id,
  }: FindByID): Promise<PeopleWithAddressAndEmailResponse | null> {
    const person = fakePeople.find(
      (person_) => person_.id === id && person_.enable,
    )!

    if (!person) return null

    return {
      ...person,
      address: fakeAddress.find(
        (address_) => address_.id === person.addressId,
      )!,
      email: fakeUsers.find((user) => user.id === person.userId)?.email || null,
    }
  }

  async findByName({ name }: FindByName): Promise<Person[] | []> {
    return (
      fakePeople.filter(
        (people) =>
          people.name
            ?.toLowerCase()
            .trim()
            .includes(name.toLowerCase().trim()) && people.enable === true,
      ) || []
    )
  }

  async findByAddressId({
    addressId,
  }: FindByAddressID): Promise<Person | null> {
    return (
      fakePeople.find(
        (person) => person.addressId === addressId && person.enable,
      ) || null
    )
  }

  async delete({ id }: Delete): Promise<void> {
    const index = fakePeople.findIndex(
      (person) => person.id === id && person.enable,
    )

    fakePeople[index] = {
      ...fakePeople[index],
      updatedAt: new Date(),
      enable: false,
    }
  }
}
