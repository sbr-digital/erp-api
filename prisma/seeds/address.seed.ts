import { faker } from '@faker-js/faker'

import { prismaForTest } from '../'

export async function seedAddress({ make = false }): Promise<void> {
  if (!make) return

  await prismaForTest.address.createMany({
    data: [
      {
        country: faker.location.country(),
        state: faker.location.state(),
        city: faker.location.city(),
        street: faker.location.street(),
        number: faker.location.buildingNumber(),
        district: faker.location.direction(),
        details: faker.location.secondaryAddress(),
        zip_code: faker.location.zipCode(),
      },
      {
        country: faker.location.country(),
        state: faker.location.state(),
        city: faker.location.city(),
        street: faker.location.street(),
        number: faker.location.buildingNumber(),
        district: faker.location.direction(),
        details: faker.location.secondaryAddress(),
        zip_code: faker.location.zipCode(),
      },
    ],
  })
}
