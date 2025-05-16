/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyBaseLogger } from 'fastify'
import pino from 'pino'
import { inject, injectable } from 'tsyringe'

import { CONTAINER } from '@/constants'
import { ILoggerService } from '@/interfaces/logger'

@injectable()
export class PinoLoggerService implements ILoggerService {
  constructor(
    @inject(CONTAINER.SERVICES.LOGGER)
    public readonly logger = pino({
      level: 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
      serializers: {
        func: (value) => value.toString(),
      },
    }),
  ) {}

  getLogger(): FastifyBaseLogger {
    return this.logger
  }

  info<T extends object>(data: T, msg?: string, ...args: any[]): void
  info(data: unknown, msg?: string, ...args: any[]): void
  info(data: string, ...args: any[]): void {
    this.logger.info(data, ...args)
  }

  debug<T extends object>(data: T, msg?: string, ...args: any[]): void
  debug(data: unknown, msg?: string, ...args: any[]): void
  debug(data: string, ...args: any[]): void {
    this.logger.debug(data, ...args)
  }

  error(data: unknown): void {
    this.logger.error(data)
  }

  fatal(data: unknown): void {
    this.logger.fatal(data)
  }

  trace(data: unknown): void {
    this.logger.trace(data)
  }

  warn(data: unknown): void {
    this.logger.warn(data)
  }
}
