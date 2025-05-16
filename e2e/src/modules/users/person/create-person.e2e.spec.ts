import { PATHS, VALID_CPF } from '@/constants'
import { prismaForTest } from 'prisma'

describe('Create Person (e2e)', async () => {
  let body: Record<string, unknown>

  beforeEach(() => {
    body = {
      name: 'fake name e2e',
      email: undefined,
      documentType: 'CPF',
      documentNumber: VALID_CPF[0],
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
  })

  test('should be possible to create a new person with a correct payload', async () => {
    const { statusCode } = await mockServer.request({
      method: 'POST',
      url: PATHS.PERSON.CREATE,
      body,
    })

    const person = await prismaForTest.people.findFirst({
      where: { name: 'fake name e2e' },
    })

    expect(person?.name).toEqual('fake name e2e')
    expect(person?.document_number).toEqual(VALID_CPF[0])
    expect(statusCode).toEqual(201)
  })

  test('should be possible to create a new person without non necessary fields', async () => {
    body.email = 'validfields@email.com'
    body.phoneNumber = undefined
    body.details = undefined
    body.name = 'valid name without attributes'
    const { statusCode } = await mockServer.request({
      method: 'POST',
      url: PATHS.PERSON.CREATE,
      body,
    })

    const person = await prismaForTest.people.findFirst({
      where: { name: 'valid name without attributes' },
    })

    expect(person).toEqual(
      expect.objectContaining({
        name: 'valid name without attributes',
        document_number: VALID_CPF[0],
      }),
    )
    expect(statusCode).toEqual(201)
  })

  test('should be possible to create a new person and user if the email is valid', async () => {
    body.email = 'valid-person@email.test.com.br'
    body.name = 'valid person and user'
    const { statusCode } = await mockServer.request({
      method: 'POST',
      url: PATHS.PERSON.CREATE,
      body,
    })

    const person = await prismaForTest.people.findFirst({
      where: { name: 'valid person and user' },
    })

    const user = await prismaForTest.user.findFirst({
      where: { email: 'valid-person@email.test.com.br' },
    })

    expect(person).toEqual(
      expect.objectContaining({
        name: 'valid person and user',
        document_number: VALID_CPF[0],
      }),
    )
    expect(user).toEqual(
      expect.objectContaining({
        email: 'valid-person@email.test.com.br',
        password: expect.any(String),
      }),
    )
    expect(statusCode).toEqual(201)
  })

  test('should not be possible to create a new person with an existing email', async () => {
    body.email = 'valid-person@email.test.com.br'

    const { statusCode } = await mockServer.request({
      method: 'POST',
      url: PATHS.PERSON.CREATE,
      body,
    })

    expect(statusCode).toEqual(409)
  })

  test('should not be possible to create a new person with an invalid payload', async () => {
    body.documentNumber = ''

    const { statusCode } = await mockServer.request({
      method: 'POST',
      url: PATHS.PERSON.CREATE,
      body,
    })

    expect(statusCode).toEqual(400)
  })

  test('should not be possible to create a new person with an invalid email', async () => {
    body.email = 'invalid-email'

    const { statusCode } = await mockServer.request({
      method: 'POST',
      url: PATHS.PERSON.CREATE,
      body,
    })

    expect(statusCode).toEqual(400)
  })

  test('should not be possible to create a new person with an invalid address', async () => {
    body.address = undefined

    const { statusCode } = await mockServer.request({
      method: 'POST',
      url: PATHS.PERSON.CREATE,
      body,
    })

    expect(statusCode).toEqual(400)
  })
})
