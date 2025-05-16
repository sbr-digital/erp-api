import { randomUUID } from 'node:crypto'

import { UsersDomainAdapter } from '../adapters'
import { fakeUsers } from '../../../__tests__/mocks/fake-users'
import { User, IUserRepository } from '../../../domain'
import {
  DeleteByID,
  FindByEmail,
  FindByID,
  UpdateUser,
} from '../../../domain/types/users.types'

export class InMemoryUserRepository implements IUserRepository {
  async count(): Promise<number> {
    return fakeUsers.length
  }

  async save(user: User): Promise<User> {
    const createUser = {
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      enable: true,
    }

    fakeUsers.push(createUser)

    return fakeUsers[fakeUsers.length - 1]
  }

  async update({ id, name, email, role, password }: UpdateUser): Promise<void> {
    const index = fakeUsers.findIndex((user) => user.id === id)

    const dbData = UsersDomainAdapter.toDatabase({
      id,
      name,
      email,
      role,
      password,
    })

    fakeUsers[index] = {
      ...fakeUsers[index],
      ...dbData,
      updatedAt: new Date(),
    }
  }

  // TODO RESOLVER O PROBLEMA COM FAKE NA AUTORIZAÇÃO, REMOVER OU DEIXAR OS FAKES??
  async findByEmail({ email }: FindByEmail): Promise<User | null> {
    const user = fakeUsers.find(
      (user) => user.email.toLowerCase() === email.toLowerCase() && user.enable,
    )
    return user || null
  }

  // TODO RESOLVER O PROBLEMA COM FAKE NA AUTORIZAÇÃO, REMOVER OU DEIXAR OS FAKES??
  async findByUserID({ id }: FindByID): Promise<User | null> {
    const user = fakeUsers.find((user) => user.id === id && user.enable)

    return user || null
  }

  async deleteByUserID({ id }: DeleteByID): Promise<void> {
    const index = fakeUsers.findIndex((user) => user.id === id && user.enable)

    fakeUsers[index] = {
      ...fakeUsers[index],
      updatedAt: new Date(),
      enable: false,
    }
  }
}
