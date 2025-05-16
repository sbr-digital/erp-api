import { Authentication } from '../../../domain'

interface AuthenticationDatabaseResult {
  id: number
  token: string
  user_id: string
  expires_at: Date
}

export class AuthenticationDatabaseAdapter {
  static toDomain(
    dbResult: AuthenticationDatabaseResult | null,
  ): Authentication | null {
    if (!dbResult) return null

    return {
      id: dbResult.id,
      userId: dbResult.user_id,
      expiresAt: dbResult.expires_at,
      token: dbResult.token,
    }
  }
}
