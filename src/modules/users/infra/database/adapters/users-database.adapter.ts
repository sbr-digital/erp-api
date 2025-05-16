import { User } from '../../../domain'

interface UsersDatabaseResult {
  id: string
  name: string
  email: string
  password: string
  role: 'ADMIN' | 'MEMBER' | 'FINANCIAL' | 'ASSOCIATE'
  created_at: Date
  updated_at: Date
  enable: boolean
}

export class UsersDatabaseAdapter {
  static toDomain(dbResult: UsersDatabaseResult | null): User | null {
    if (!dbResult) {
      return null
    }

    return {
      id: dbResult.id,
      createdAt: dbResult.created_at,
      updatedAt: dbResult.updated_at,
      name: dbResult.name,
      email: dbResult.email,
      password: dbResult.password,
      role: dbResult.role,
      enable: dbResult.enable,
    }
  }
}
