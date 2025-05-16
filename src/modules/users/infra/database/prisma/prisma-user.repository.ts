import { prisma } from '@/infra/database/prisma'

import { UsersDatabaseAdapter, UsersDomainAdapter } from '../adapters'
import { IUserRepository, User } from '../../../domain'
import {
  DeleteByID,
  FindByEmail,
  FindByID,
  UpdateUser,
} from '../../../domain/types/users.types'

export class PrismaUserRepository implements IUserRepository {
  async count(): Promise<number> {
    return prisma.user.count()
  }

  async save(user: User): Promise<User> {
    const dbData = UsersDomainAdapter.toDatabase(user)

    const createUser = await prisma.user.create({ data: dbData })

    return UsersDatabaseAdapter.toDomain(createUser)!
  }

  async update(user: UpdateUser): Promise<void> {
    const dbData = UsersDomainAdapter.toDatabase(user)

    await prisma.user.update({
      where: { id: user.id, enable: true },
      data: dbData,
    })
  }

  async findByEmail({ email }: FindByEmail): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { email, enable: true },
    })

    return user && UsersDatabaseAdapter.toDomain(user)
  }

  async findByUserID({ id }: FindByID): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { id, enable: true },
    })

    return user && UsersDatabaseAdapter.toDomain(user)
  }

  async deleteByUserID({ id }: DeleteByID): Promise<void> {
    await prisma.user.update({
      where: { id, enable: true },
      data: { enable: false, updated_at: new Date() },
    })
  }
}
