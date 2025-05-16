import { Authentication, IAuthenticationRepository } from '../../../domain'

const fakeAuth: Authentication[] = []
export class InMemoryAuthenticationRepository
  implements IAuthenticationRepository
{
  async save({ token, userId, expiresAt }: Authentication): Promise<void> {
    const id = fakeAuth.length + 1

    fakeAuth.push({ id, token, userId, expiresAt })
  }

  async findByToken(token: string): Promise<Authentication | null> {
    const authentication = fakeAuth.find((auth) => auth.token === token)

    return authentication || null
  }

  async update(id: number, auth: Authentication): Promise<void> {
    const index = fakeAuth.findIndex((auth) => auth.id === id)

    fakeAuth[index].token = auth.token ?? fakeAuth[index].token
    fakeAuth[index].expiresAt = auth.expiresAt ?? fakeAuth[index].expiresAt
  }
}
