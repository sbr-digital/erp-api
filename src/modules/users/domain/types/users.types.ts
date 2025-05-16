import { CreateUserInput, UpdateUserInput } from '../../dtos'

export type SaveUser = CreateUserInput
export type UpdateUser = UpdateUserInput

export type FindByEmail = {
  email: string
}

export type FindByID = {
  id: string
}

export type DeleteByID = FindByID
