import { DOCUMENT_TYPE_ENUM } from '@/constants'

export interface Person {
  id: number
  createdAt: Date
  updatedAt: Date
  addressId: number
  enable: boolean
  name: string
  documentType: DOCUMENT_TYPE_ENUM
  documentNumber: string
  birthday: Date
  phoneNumber?: string | undefined | null
  details?: string | undefined | null
  userId?: string | undefined | null
}
