import { faker } from '@faker-js/faker'

import { prismaForTest } from '..'

interface SeedPUser {
  make?: boolean
  name: string
}

export async function seedUser({
  make = false,
  name,
}: SeedPUser): Promise<void> {
  if (!make) return

  await prismaForTest.user.create({
    data: {
      name,
      email: faker.internet.email(),
      password: faker.internet.password(),
    },
  })
}
