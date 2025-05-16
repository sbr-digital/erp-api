import { Address } from '@/modules/address/domain'

import { Person } from '../entities/person.entity'
import { UpdatePersonInput } from '../../dtos'

export interface PeopleWithAddressAndEmailResponse extends Person {
  address: Omit<Address, 'id' | 'createdAt' | 'updatedAt' | 'enable'>
  email: string | null
}

export interface ListPaginatedPeople {
  people: PeopleWithAddressAndEmailResponse[]
  total: number
}

export type SavePerson = Omit<
  Person,
  'id' | 'createdAt' | 'updatedAt' | 'enable'
>

export type UpdatePerson = UpdatePersonInput

export type FindByName = {
  name: string
}

export type FindByUserID = {
  userId: string
}

export type ListAll = {
  name: string | undefined
  page: number
  pageSize: number
}

export type FindByAddressID = {
  addressId: number
}
