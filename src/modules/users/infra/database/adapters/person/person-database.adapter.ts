import { DOCUMENT_TYPE_ENUM } from '@/constants'
import { PeopleWithAddressAndEmailResponse } from '@/modules/users/domain/types/people.types'

interface PersonDatabaseResult {
  id: number
  created_at: Date
  updated_at: Date
  address_id: number
  enable: boolean
  name: string
  document_type: DOCUMENT_TYPE_ENUM
  document_number: string
  birthday: Date
  phone_number: string | undefined | null
  details?: string | undefined | null
  user_id?: string | undefined | null
  address: {
    street: string
    number: string
    district: string
    city: string
    state: string
    zip_code: string
    country: string
    details?: string | null | undefined
  }
  user: {
    email: string
  } | null
}

export class PersonDatabaseAdapter {
  static toDomain(
    dbResult: PersonDatabaseResult | null,
  ): PeopleWithAddressAndEmailResponse | null {
    if (!dbResult) {
      return null
    }

    const {
      id,
      created_at: createdAt,
      updated_at: updatedAt,
      address_id: addressId,
      enable,
      name,
      document_type: documentType,
      document_number: documentNumber,
      phone_number: phoneNumber,
      birthday,
      details,
      user_id: userId,
      address,
      user,
    } = dbResult

    return {
      id,
      createdAt,
      updatedAt,
      addressId,
      phoneNumber,
      enable,
      name,
      documentType,
      documentNumber,
      birthday,
      details,
      userId,
      email: user?.email || null,
      address: {
        street: address.street,
        number: address.number,
        city: address.city,
        state: address.state,
        district: address.district,
        country: address.country,
        details: address.details,
        zipCode: address.zip_code,
      },
    }
  }

  public static toDomainList(
    dbResults: PersonDatabaseResult[],
  ): PeopleWithAddressAndEmailResponse[] {
    return dbResults.map((result) => this.toDomain(result)!) ?? []
  }
}
