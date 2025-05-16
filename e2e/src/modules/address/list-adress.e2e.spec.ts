import { PATHS } from '@/constants'

import { prismaForTest } from 'prisma'

describe('List Address (e2e)', async () => {
  test('should be possible to list an address by id', async () => {
    const { statusCode, json } = await mockServer.request({
      method: 'GET',
      url: mockServer.parseUrl({
        path: PATHS.ADDRESS.LIST,
        params: { id: 1 },
      }),
    })

    const result = await prismaForTest.address.findFirst()

    expect(statusCode).toBe(200)
    expect(json()).toHaveProperty('address')
    expect(json().address).toEqual(
      expect.objectContaining({
        country: result?.country,
        city: result?.city,
        state: result?.state,
        street: result?.street,
        number: result?.number,
        district: result?.district,
        details: result?.details,
        zipCode: result?.zip_code,
        id: result?.id,
      }),
    )
  })

  test('should be list null if address not found', async () => {
    const { statusCode, json } = await mockServer.request({
      method: 'GET',
      url: mockServer.parseUrl({
        path: PATHS.ADDRESS.LIST,
        params: { id: 99 },
      }),
    })

    expect(statusCode).toBe(200)
    expect(json()).toEqual({ address: null })
  })
})
