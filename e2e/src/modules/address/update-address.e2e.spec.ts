import { PATHS } from '@/constants'
import { AddressDatabaseAdapter } from '@/modules/address/infra/database/adapters'

import { prismaForTest } from 'prisma'

describe('Update Address (e2e)', async () => {
  test('should be possible to update an address if id exists', async () => {
    const body = {
      country: 'country e2e',
      state: 'state e2e',
      city: 'city e2e',
      street: 'street e2e',
      number: 'number e2e',
      district: 'neighborhood e2e',
      details: 'details e2e',
      zipCode: 'zipCode e2e',
    }

    const { statusCode } = await mockServer.request({
      method: 'PUT',
      url: mockServer.parseUrl({
        path: PATHS.ADDRESS.UPDATE,
        params: { id: 1 },
      }),
      body,
    })

    const result = await prismaForTest.address.findFirst({ where: { id: 1 } })

    expect(statusCode).toBe(204)
    expect(AddressDatabaseAdapter.toDomain(result!)).toEqual(
      expect.objectContaining(body),
    )
  })

  test('should be possible to update an address if id exists and only one property is sent', async () => {
    const { statusCode } = await mockServer.request({
      method: 'PUT',
      url: mockServer.parseUrl({
        path: PATHS.ADDRESS.UPDATE,
        params: { id: 1 },
      }),
      body: {
        country: 'country new e2e',
      },
    })

    const result = await prismaForTest.address.findFirst({ where: { id: 1 } })

    expect(statusCode).toBe(204)
    expect(AddressDatabaseAdapter.toDomain(result!)).toEqual(
      expect.objectContaining({
        country: 'country new e2e',
      }),
    )
  })

  test('should not be possible to update an address if id does not exists', async () => {
    const { statusCode } = await mockServer.request({
      method: 'PUT',
      url: mockServer.parseUrl({
        path: PATHS.ADDRESS.UPDATE,
        params: { id: 99 },
      }),
      body: {
        country: 'country e2e',
        state: 'state e2e',
        city: 'city e2e',
        street: 'street e2e',
        number: 'number e2e',
        district: 'neighborhood e2e',
        details: 'details e2e',
        zipCode: 'zipCode e2e',
      },
    })

    expect(statusCode).toBe(404)
  })

  test('should not be possible to update an address if invalid payload', async () => {
    const { statusCode } = await mockServer.request({
      method: 'PUT',
      url: mockServer.parseUrl({
        path: PATHS.ADDRESS.UPDATE,
        params: { id: 1 },
      }),
      body: {
        street: 'a',
      },
    })

    expect(statusCode).toBe(400)
  })
})
