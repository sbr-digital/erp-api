import { filterUndefinedValues } from '@/modules/utils'

import { Person } from '../../../../domain'

export class PersonDomainAdapter {
  static toDatabase(person: Person) {
    const {
      id,
      updatedAt,
      addressId,
      phoneNumber,
      userId,
      name,
      documentType,
      documentNumber,
      birthday,
      details,
    } = person

    const databaseFormat = {
      id,
      updated_at: updatedAt,
      user_id: userId,
      address_id: addressId,
      phone_number: phoneNumber,
      name,
      document_type: documentType,
      document_number: documentNumber,
      birthday,
      details,
    }
    return filterUndefinedValues(databaseFormat)
  }
}
