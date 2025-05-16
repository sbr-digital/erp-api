import { prisma } from '@/infra/database/prisma'

import {
  AuthenticationDatabaseAdapter,
  AuthenticationDomainAdapter,
} from '../adapters'
import { Authentication, IAuthenticationRepository } from '../../../domain'

export class PrismaAuthenticationRepository
  implements IAuthenticationRepository
{
  async save(authentication: Authentication): Promise<void> {
    const dbData = AuthenticationDomainAdapter.toDatabase(authentication)

    await prisma.authentication.create({
      data: dbData,
    })
  }

  async findByToken(token: string): Promise<Authentication | null> {
    const token_ = await prisma.authentication.findFirst({ where: { token } })

    return AuthenticationDatabaseAdapter.toDomain(token_)
  }

  async update(
    id: number,
    { token, expiresAt }: Authentication,
  ): Promise<void> {
    await prisma.authentication.update({
      where: { id },
      data: {
        token,
        expires_at: expiresAt,
      },
    })
  }
}
