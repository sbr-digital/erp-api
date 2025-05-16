import { randomUUID } from 'crypto'

import { PATHS, VALID_CPF } from '@/constants'
import { PasswordService } from '@/infra/services'

import { prismaForTest } from 'prisma'

describe('ListUserInfo(e2e)', async () => {
  const body = {
    documentNumber: VALID_CPF[0],
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
      email: 'testin-info9g@example.com',
    },
  })

  const user = await prismaForTest.user.findFirst({
    where: { email: 'testin-info9g@example.com' },
  })

  const password = await new PasswordService().hashPassword('Password123!')

  await prismaForTest.user.update({
    where: { id: user?.id },
    data: {
      password,
    },
  })

  const { json } = await mockServer.request({
    method: 'POST',
    url: PATHS.SIGN_IN,
    body: {
      email: 'testin-info9g@example.com',
      password: 'Password123!',
    },
  })

  const headers = { authorization: 'Bearer ' + json().token }

  test('should be possible to list the information from the logged user', async () => {
    const { statusCode, body } = await mockServer.request({
      method: 'GET',
      url: PATHS.USERS.LIST_INFO,
      headers,
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

  test('should not be possible to list the information of an unused user', async () => {
    const { statusCode } = await mockServer.request({
      method: 'GET',
      url: PATHS.USERS.LIST_INFO,
    })

    expect(statusCode).toEqual(403)
  })

  test.skip('should be possible to list the information of another user if the user is logged in', async () => {
    await mockServer.request({
      method: 'POST',
      url: PATHS.PERSON.CREATE,
      body: {
        documentNumber: VALID_CPF[1],
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
        name: 'another testing new',
        email: 'another-infog@example.com',
      },
    })

    const user = await prismaForTest.user.findFirst({
      where: { email: 'another-infog@example.com' },
    })

    const password = await new PasswordService().hashPassword('Password123!')

    await prismaForTest.user.update({
      where: { id: user?.id },
      data: { password },
    })

    const { statusCode, body } = await mockServer.request({
      method: 'GET',
      url: `${PATHS.USERS.LIST_INFO}?id=${user?.id}`,
      headers,
    })

    expect(JSON.parse(body)).toEqual(
      expect.objectContaining({
        userId: user?.id,
        name: 'another testing new',
        email: 'another-infog@example.com',
      }),
    )

    expect(statusCode).toEqual(200)
  })

  test('should not be possible to list information from a user if the userid does not exist', async () => {
    const { statusCode } = await mockServer.request({
      method: 'GET',
      url: `${PATHS.USERS.LIST_INFO}?id=${randomUUID()}`,
      headers,
    })
    expect(statusCode).toEqual(404)
  })
})
