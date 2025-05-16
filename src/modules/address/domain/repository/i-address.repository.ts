import { IGenericRepository } from '@/core/domain/repository/IGeneric.repository'

import { Address } from '../entities/address.entity'
import {
  DeleteAddress,
  FindAddressById,
  SaveAddress,
  UpdateAddress,
} from '../types/address.types'

export interface IAddressRepository
  extends IGenericRepository<
    Address,
    undefined,
    SaveAddress,
    UpdateAddress,
    FindAddressById,
    DeleteAddress
  > {}
