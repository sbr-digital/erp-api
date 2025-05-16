import { Authentication } from '../../../domain'

export class AuthenticationDomainAdapter {
  static toDatabase(authentication: Authentication) {
    return {
      id: authentication.id,
      token: authentication.token,
      user_id: authentication.userId,
      expires_at: authentication.expiresAt,
    }
  }
}
