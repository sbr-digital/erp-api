import { MockPinoLoggerService } from './mock-pino-logger.service'
import { PinoLoggerService } from './pino-logger.service'

describe('PinoLoggerService', () => {
  const mockLogger = {
    info: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    fatal: vi.fn(),
  }

  const loggerService = new PinoLoggerService(mockLogger as never)

  it('should log info messages', () => {
    loggerService.info('Test info message')
    expect(mockLogger.info).toHaveBeenCalledWith('Test info message')
  })

  it('should log debug messages', () => {
    loggerService.debug('Test debug message')
    expect(mockLogger.debug).toHaveBeenCalledWith('Test debug message')
  })

  it('should log warn messages', () => {
    loggerService.warn('Test warn message')
    expect(mockLogger.warn).toHaveBeenCalledWith('Test warn message')
  })

  it('should log error messages', () => {
    loggerService.error('Test error message')
    expect(mockLogger.error).toHaveBeenCalledWith('Test error message')
  })

  it('should log fatal messages', () => {
    loggerService.fatal('Test fatal message')
    expect(mockLogger.fatal).toHaveBeenCalledWith('Test fatal message')
  })
})

describe('MockPinoLoggerService', () => {
  const mockLoggerService = new MockPinoLoggerService()

  it('should log info messages', () => {
    const consoleSpy = vi.spyOn(console, 'info')
    mockLoggerService.info('Test info message')
    expect(consoleSpy).toHaveBeenCalledWith(
      '[INFO]',
      'Test info message',
      undefined,
    )
    consoleSpy.mockRestore()
  })

  it('should log debug messages', () => {
    const consoleSpy = vi.spyOn(console, 'debug')
    mockLoggerService.debug('Test debug message')
    expect(consoleSpy).toHaveBeenCalledWith(
      '[DEBUG]',
      'Test debug message',
      undefined,
    )
    consoleSpy.mockRestore()
  })

  it('should log warn messages', () => {
    const consoleSpy = vi.spyOn(console, 'warn')
    mockLoggerService.warn('Test warn message')
    expect(consoleSpy).toHaveBeenCalledWith(
      '[WARN]',
      'Test warn message',
      undefined,
    )
    consoleSpy.mockRestore()
  })

  it('should log error messages', () => {
    const consoleSpy = vi.spyOn(console, 'error')
    mockLoggerService.error('Test error message')
    expect(consoleSpy).toHaveBeenCalledWith(
      '[ERROR]',
      'Test error message',
      undefined,
    )
    consoleSpy.mockRestore()
  })

  it('should log fatal messages', () => {
    const consoleSpy = vi.spyOn(console, 'error')
    mockLoggerService.fatal('Test fatal message')
    expect(consoleSpy).toHaveBeenCalledWith(
      '[FATAL]',
      'Test fatal message',
      undefined,
    )
    consoleSpy.mockRestore()
  })
})
