import { IFastifyError } from '@/interfaces'

export class CustomError extends Error {
  public statusCode: number

  constructor({ message, statusCode }: IFastifyError) {
    super()
    this.message = message as string
    this.statusCode = statusCode
  }
}
