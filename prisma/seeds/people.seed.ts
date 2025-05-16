import { faker } from '@faker-js/faker'

import { prismaForTest } from '..'

interface SeedPeople {
  make?: boolean
  name: string
}

export async function seedPeople({
  make = false,
  name,
}: SeedPeople): Promise<void> {
  if (!make) return

  const [user, address] = await Promise.all([
    prismaForTest.user.findFirst({
      where: { name },
    }),
    prismaForTest.address.findFirst({}),
  ])

  const documentType = faker.helpers.arrayElement(['CPF', 'CNPJ'])

  const documentNumber =
    documentType === 'CPF' ? faker.string.numeric(11) : faker.string.numeric(14)

  const person = {
    name,
    phone_number: faker.phone.number(),
    user_id: user!.id,
    address_id: address!.id,
    birthday: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
    document_type: documentType,
    document_number: documentNumber,
  }

  await prismaForTest.people.create({
    data: person,
  })
}
