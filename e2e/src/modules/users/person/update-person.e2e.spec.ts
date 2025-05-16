import { PATHS, VALID_CPF } from '@/constants'
import { prismaForTest } from 'prisma'

describe('Update Person (e2e)', async () => {
  let body: Record<string, unknown>

  const getPerson = await prismaForTest.people.findFirst()

  beforeEach(() => {
    body = {
      name: 'update name e2e',
      email: undefined,
      documentType: 'CPF',
      documentNumber: VALID_CPF[1],
      birthday: new Date('2015-01-01'),
      phoneNumber: '55999999900',
      address: {
        country: 'update country',
        state: 'update state',
        city: 'update city',
        zipCode: 'update zipCode',
        street: 'update street',
        number: '199',
        district: 'udate district',
        details: 'udate details',
      },
    }
  })

  test('should be possible to update a person', async () => {
    const { statusCode } = await mockServer.request({
      method: 'PUT',
      url: mockServer.parseUrl({
        path: PATHS.PERSON.UPDATE,
        params: { id: getPerson!.id },
      }),
      body,
    })

    const person = await prismaForTest.people.findFirst({
      where: { id: getPerson!.id },
    })
    const address = await prismaForTest.address.findFirst({
      where: { id: person?.address_id },
    })

    expect(person).toEqual(
      expect.objectContaining({
        name: 'update name e2e',
        document_number: VALID_CPF[1],
        phone_number: '55999999900',
      }),
    )
    expect(address).toEqual(
      expect.objectContaining({
        country: 'update country',
        state: 'update state',
        city: 'update city',
        zip_code: 'update zipCode',
        street: 'update street',
        number: '199',
        district: 'udate district',
        details: 'udate details',
      }),
    )
    expect(statusCode).toEqual(204)
  })

  test('should be possible to update a person and user with name and email', async () => {
    const { statusCode } = await mockServer.request({
      method: 'PUT',
      url: mockServer.parseUrl({
        path: PATHS.PERSON.UPDATE,
        params: { id: getPerson!.id },
      }),
      body: {
        email: 'update-person-e2e@njaa.ong.br',
        name: 'valid person and user name',
      },
    })

    const person = await prismaForTest.people.findFirst({
      where: { name: 'valid person and user name' },
    })

    const user = await prismaForTest.user.findFirst({
      where: { email: 'update-person-e2e@njaa.ong.br' },
    })

    expect(person).toEqual(
      expect.objectContaining({
        name: 'valid person and user name',
        document_number: body.documentNumber,
      }),
    )
    expect(user).toEqual(
      expect.objectContaining({
        id: getPerson?.user_id,
        name: 'valid person and user name',
        email: 'update-person-e2e@njaa.ong.br',
      }),
    )
    expect(statusCode).toEqual(204)
  })

  test('should not be possible to update a person if it does not exists', async () => {
    const { statusCode } = await mockServer.request({
      method: 'PUT',
      url: mockServer.parseUrl({
        path: PATHS.PERSON.UPDATE,
        params: { id: 999 },
      }),
      body: {
        email: 'update-person-e2e@njaa.ong.br',
        name: 'valid person and user name',
      },
    })

    expect(statusCode).toEqual(404)
  })

  test('should not be possible to update the person email at the users base if it already exists', async () => {
    await mockServer.request({
      method: 'POST',
      url: PATHS.USERS.CREATE,
      body: {
        name: 'John Doe',
        email: 'johndoe-conflict@example.com',
        password: 'Password123!',
        role: 'MEMBER',
      },
    })

    const { statusCode } = await mockServer.request({
      method: 'PUT',
      url: mockServer.parseUrl({
        path: PATHS.PERSON.UPDATE,
        params: { id: getPerson!.id },
      }),
      body: {
        email: 'johndoe-conflict@example.com',
      },
    })

    expect(statusCode).toEqual(409)
  })
})
