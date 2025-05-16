import { CreateAddressInput, UpdateAddressInput } from '../../dtos'

export type SaveAddress = CreateAddressInput
export type UpdateAddress = UpdateAddressInput

export type FindAddressById = {
  id: number
}

export type DeleteAddress = FindAddressById
