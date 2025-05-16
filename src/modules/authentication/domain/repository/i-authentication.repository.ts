import { Authentication } from '../entities/authentication.entity'

export interface IAuthenticationRepository {
  save(auth: Authentication): Promise<void>
  findByToken(token: string): Promise<Authentication | null>
  update(id: number, auth: Authentication): Promise<void>
}
