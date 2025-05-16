/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILoggerService } from '@/interfaces/logger'

export class MockPinoLoggerService implements ILoggerService {
  getLogger(): unknown {
    return console.log('[getlooger]')
  }

  info<T extends object>(obj: T, msg?: string | undefined, ...args: any[]): void
  info(obj: unknown, msg?: string | undefined, ...args: any[]): void
  info(msg: string, ...args: any[]): void
  info(obj: unknown, msg?: unknown, ...args: unknown[]): void {
    console.info('[INFO]', obj, msg, ...args)
  }

  debug<T extends object>(
    obj: T,
    msg?: string | undefined,
    ...args: any[]
  ): void

  debug(obj: unknown, msg?: string | undefined, ...args: any[]): void
  debug(msg: string, ...args: any[]): void
  debug(obj: unknown, msg?: unknown, ...args: unknown[]): void {
    console.debug('[DEBUG]', obj, msg, ...args)
  }

  error<T extends object>(
    obj: T,
    msg?: string | undefined,
    ...args: any[]
  ): void

  error(obj: unknown, msg?: string | undefined, ...args: any[]): void
  error(msg: string, ...args: any[]): void
  error(obj: unknown, msg?: unknown, ...args: unknown[]): void {
    console.error('[ERROR]', obj, msg, ...args)
  }

  fatal<T extends object>(
    obj: T,
    msg?: string | undefined,
    ...args: any[]
  ): void

  fatal(obj: unknown, msg?: string | undefined, ...args: any[]): void
  fatal(msg: string, ...args: any[]): void
  fatal(obj: unknown, msg?: unknown, ...args: unknown[]): void {
    console.error('[FATAL]', obj, msg, ...args)
  }

  trace<T extends object>(
    obj: T,
    msg?: string | undefined,
    ...args: any[]
  ): void

  trace(obj: unknown, msg?: string | undefined, ...args: any[]): void
  trace(msg: string, ...args: any[]): void
  trace(obj: unknown, msg?: unknown, ...args: unknown[]): void {
    console.trace('[TRACE]', obj, msg, ...args)
  }

  warn<T extends object>(obj: T, msg?: string | undefined, ...args: any[]): void
  warn(obj: unknown, msg?: string | undefined, ...args: any[]): void
  warn(msg: string, ...args: any[]): void
  warn(obj: unknown, msg?: unknown, ...args: unknown[]): void {
    console.warn('[WARN]', obj, msg, ...args)
  }
}
