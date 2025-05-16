import { VALID_CPF } from '@/constants'

import { fakeUsers } from './fake-users'
import { Person } from '../../domain'

export const fakePeople: Person[] = [
  {
    id: 1,
    name: 'valid name',
    createdAt: new Date(),
    updatedAt: new Date(),
    documentNumber: VALID_CPF[0],
    documentType: 'CPF',
    birthday: new Date('2021-01-01'),
    phoneNumber: '55999999999',
    userId: fakeUsers[0].id,
    addressId: 1,
    enable: true,
  },

  {
    id: 2,
    name: 'valid name PERSON',
    createdAt: new Date(),
    updatedAt: new Date(),
    documentNumber: VALID_CPF[1],
    documentType: 'CPF',
    birthday: new Date('2021-01-01'),
    phoneNumber: '55999999999',
    userId: fakeUsers[1].id,
    addressId: 1,
    enable: true,
  },

  {
    id: 3,
    name: 'valid name',
    createdAt: new Date(),
    updatedAt: new Date(),
    documentNumber: VALID_CPF[2],
    documentType: 'CPF',
    birthday: new Date('2021-01-01'),
    phoneNumber: '55999999999',
    userId: fakeUsers[2].id,
    addressId: 1,
    enable: true,
  },

  {
    id: 4,
    name: 'valid name',
    createdAt: new Date(),
    updatedAt: new Date(),
    documentNumber: VALID_CPF[3],
    documentType: 'CPF',
    birthday: new Date('2021-01-01'),
    phoneNumber: '55999999999',
    userId: fakeUsers[3].id,
    addressId: 1,
    enable: true,
  },

  {
    id: 5,
    name: 'valid year restrict',
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date(),
    documentNumber: VALID_CPF[4],
    documentType: 'CPF',
    birthday: new Date('2021-01-01'),
    phoneNumber: '55999999999',
    userId: fakeUsers[4].id,
    addressId: 5,
    enable: true,
  },
]
