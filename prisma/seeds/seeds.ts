import { faker } from '@faker-js/faker'
import { execSync } from 'node:child_process'

import { prismaForTest } from '../'
import { seedAddress } from './address.seed'
import { seedPeople } from './people.seed'
import { seedUser } from './user.sedd'

export async function seedERP() {
  execSync('npx prisma migrate deploy')
  const isExecute = true

  const name = faker.person.fullName()

  await seedAddress({ make: isExecute })
  await seedUser({ make: isExecute, name })
  await seedPeople({ make: isExecute, name })

  await prismaForTest.$disconnect()
}

seedERP()
