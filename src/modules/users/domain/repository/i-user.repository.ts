import { IGenericRepository } from '@/core/domain/repository/IGeneric.repository'
import { Delete } from '@/core/types/Generic.types'

import { User } from '../entities/user.entity'
import {
  FindByEmail,
  SaveUser,
  UpdateUser,
  FindByID,
  DeleteByID,
} from '../types/users.types'

export interface IUserRepository
  extends Omit<
    IGenericRepository<User, undefined, SaveUser, UpdateUser, FindByID, Delete>,
    'delete' | 'findByID'
  > {
  findByUserID({ id }: FindByID): Promise<User | null>

  findByEmail({ email }: FindByEmail): Promise<User | null>

  deleteByUserID({ id }: DeleteByID): Promise<void>
}
