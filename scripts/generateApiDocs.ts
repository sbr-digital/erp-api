import fs from 'node:fs'
import path from 'node:path'

import { apiDocs } from '../docs'
import { env } from '../src/infra/env'

export const generateApiDocs = () => {
  const filePath =
    env.NODE_ENV === 'production'
      ? path.join(__dirname, '../', 'openapi.json')
      : path.join(__dirname, '../docs', 'openapi.json')

  fs.writeFileSync(filePath, JSON.stringify(apiDocs, null, 2))
  console.log(`Updated API-docs`)
}

generateApiDocs()
