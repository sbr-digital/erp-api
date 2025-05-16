import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
}

config({ path: '.env' })

const envSchema = z.object({
  NODE_ENV: z
    .enum(['local', 'test', 'production', 'homolog'])
    .default('production'),
  APPLICATION: z.enum(['ERP', 'TEMPLATE']).default('TEMPLATE'),
  PORT: z.coerce.number().default(4450),
  DATABASE_URL: z.string(),
  PASSPHRASE: z.string(),
  PRIVATE_KEY: z.string(),
  PUBLIC_KEY: z.string(),
  CORS_ORIGIN: z.string(),
  ACTIVE_CACHE: z
    .string()
    .transform((value) => (value && value.toLowerCase() === 'true') || false),
  BLOCK_PREFIXES: z.string().transform((value) => value.split(',') || []),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables!', _env.error.format())

  throw new Error('Invalid environment variables!')
}

export const env = _env.data
