import { User } from '../../../domain'

export class UsersDomainAdapter {
  static toDatabase({
    id,
    name,
    email,
    role,
    password,
    updatedAt,
  }: Partial<User>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = { id }

    return {
      ...data,
      ...(email !== undefined && { email }),
      ...(role !== undefined && { role }),
      ...(name !== undefined && { name }),
      ...(password !== undefined && { password }),
      ...(updatedAt !== undefined && { updated_at: updatedAt }),
    }
  }
}
