import 'dotenv/config'

import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'

import { PrismaClient } from '@prisma/client'

export const prismaForTest = new PrismaClient()

function generatedDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL)
    throw new Error('Please provide a DATABASE_URL variable.')

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default {
  name: 'prisma',
  transformMode: 'web',
  async setup() {
    const schema = randomUUID()
    const databaseURL = generatedDatabaseURL(schema)

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma db seed')

    return {
      async teardown() {
        await prismaForTest.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prismaForTest.$disconnect()
      },
    }
  },
}
