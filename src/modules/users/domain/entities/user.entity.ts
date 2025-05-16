import { ROLE_ENUM } from '@/constants'

export interface User {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  email: string
  password: string
  role?: typeof ROLE_ENUM
  enable: boolean
}
