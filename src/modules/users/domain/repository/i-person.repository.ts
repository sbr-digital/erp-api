import { IGenericRepository } from '@/core/domain/repository/IGeneric.repository'
import { Count, Delete, FindByID } from '@/core/types/Generic.types'

import { Person } from '../entities/person.entity'
import {
  FindByAddressID,
  FindByName,
  FindByUserID,
  ListAll,
  ListPaginatedPeople,
  SavePerson,
  PeopleWithAddressAndEmailResponse,
  UpdatePerson,
} from '../types/people.types'

export interface IPersonRepository
  extends IGenericRepository<
    Person,
    Count,
    SavePerson,
    UpdatePerson,
    FindByID,
    Delete
  > {
  listAll({ name, page }: ListAll): Promise<ListPaginatedPeople>
  findByName({ name }: FindByName): Promise<Person[] | []>
  findByUserID({
    userId,
  }: FindByUserID): Promise<PeopleWithAddressAndEmailResponse>
  findByPersonID({
    id,
  }: FindByID): Promise<PeopleWithAddressAndEmailResponse | null>
  findByAddressId({ addressId }: FindByAddressID): Promise<Person | null>
}
