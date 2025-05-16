export interface Address {
  id: number
  createdAt: Date
  updatedAt: Date
  enable: boolean
  street: string
  number: string
  district: string
  city: string
  state: string
  zipCode: string
  country: string
  details?: string | null | undefined
}
