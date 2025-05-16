import { Address } from '../../../domain'

interface AddressDatabaseResult {
  id: number
  created_at: Date
  updated_at: Date
  country: string
  enable: boolean
  street: string
  number: string
  details?: string | null | undefined
  city: string
  state: string
  district: string
  zip_code: string
}

export class AddressDatabaseAdapter {
  static toDomain(dbResult: AddressDatabaseResult): Address {
    const {
      id,
      country,
      enable,
      street,
      number,
      details,
      city,
      state,
      district,
      created_at: createdAt,
      updated_at: updatedAt,
      zip_code: zipCode,
    } = dbResult

    return {
      id,
      createdAt,
      updatedAt,
      country,
      enable,
      street,
      number,
      details,
      city,
      state,
      zipCode,
      district,
    }
  }

  public static toDomainList(dbResults: AddressDatabaseResult[]): Address[] {
    return dbResults
      .map(this.toDomain)
      .filter((result) => result !== null) as Address[]
  }
}
