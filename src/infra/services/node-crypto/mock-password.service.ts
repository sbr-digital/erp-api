import { IPasswordService } from '@/interfaces'

export class MockPasswordService implements IPasswordService {
  async hashPassword(password: string): Promise<string> {
    return password
  }

  async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return !!(password === hashedPassword)
  }
}
