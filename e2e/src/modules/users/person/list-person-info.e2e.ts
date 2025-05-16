import { PATHS, VALID_CPF } from '@/constants'

import { prismaForTest } from 'prisma'

describe('ListPersonInfo(e2e)', async () => {
  const body = {
    documentNumber: VALID_CPF[4],
    documentType: 'CPF',
    birthday: new Date('2021-01-01'),
    phoneNumber: '55999999999',
    address: {
      country: 'country',
      state: 'state',
      city: 'city',
      zipCode: 'zipCode',
      street: 'street',
      number: '1',
      district: 'district',
    },
  }

  await mockServer.request({
    method: 'POST',
    url: PATHS.PERSON.CREATE,
    body: {
      ...body,
      name: 'testing new',
      email: 'testin-infog@example.com',
    },
  })

  const person = await prismaForTest.people.findFirst({
    where: { document_number: VALID_CPF[4] },
  })
  console.log('aqui', person)
  test('should be possible to list person by id', async () => {
    const { statusCode, body } = await mockServer.request({
      method: 'GET',
      url: mockServer.parseUrl({
        path: PATHS.PERSON.INFO,
        params: { id: person!.id },
      }),
    })

    expect(JSON.parse(body)).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        email: expect.any(String),
      }),
    )
    expect(statusCode).toEqual(200)
  })

  test('should not be possible to list information from a person if the id does not exist', async () => {
    const { statusCode } = await mockServer.request({
      method: 'GET',
      url: mockServer.parseUrl({
        path: PATHS.PERSON.INFO,
        params: { id: 99 },
      }),
    })
    expect(statusCode).toEqual(404)
  })
})
