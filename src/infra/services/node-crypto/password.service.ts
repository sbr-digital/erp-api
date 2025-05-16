import crypto from 'node:crypto'

import { IPasswordService } from '@/interfaces'

export class PasswordService implements IPasswordService {
  async hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, saltBuffer) => {
        if (err) {
          reject(err)
        } else {
          const salt = saltBuffer.toString('base64')

          crypto.pbkdf2(
            password,
            salt,
            100000,
            32,
            'sha512',
            (err, derivedKey) => {
              if (err) {
                reject(err)
              } else {
                resolve(`${derivedKey.toString('base64')}:${salt}`)
              }
            },
          )
        }
      })
    })
  }

  async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [hash, salt] = hashedPassword.split(':')

      crypto.pbkdf2(password, salt, 100000, 32, 'sha512', (err, derivedKey) => {
        if (err) {
          reject(err)
        } else {
          resolve(hash === derivedKey.toString('base64'))
        }
      })
    })
  }
}
