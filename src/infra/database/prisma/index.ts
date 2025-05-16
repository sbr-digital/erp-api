import { server } from '@/app'
import { env } from '@/infra/env'
import { PrismaClient } from '@prisma/client'

export const prisma =
  env.NODE_ENV !== 'test'
    ? new PrismaClient({
        errorFormat: 'colorless',
        log: [
          { level: 'query', emit: 'event' },
          { level: 'warn', emit: 'event' },
          { level: 'info', emit: 'event' },
          { level: 'error', emit: 'event' },
        ],
      })
    : new PrismaClient()

async function main() {
  await prisma.user.count({})
}

env.NODE_ENV !== 'test' &&
  main()
    .then(async () => {
      prisma.$on('query', (e) => {
        server.fatifyLogger.info(`Query: ${e.query} took ${e.duration}ms`)
      })

      prisma.$on('warn', (e) => {
        server.fatifyLogger.warn(`warn: ${e.message} took ${e.timestamp}ms`)
      })

      prisma.$on('info', (e) => {
        server.fatifyLogger.info(`info: ${e.message} took ${e.timestamp}ms`)
      })

      prisma.$on('error', (e) => {
        server.fatifyLogger.error(`error: ${e.message} took ${e.timestamp}ms`)
      })
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      server.fatifyLogger.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
