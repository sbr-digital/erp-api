import { PATHS } from '@/constants'

describe('Create Address (e2e)', async () => {
  test('should be possible to create new address', async () => {
    const { statusCode } = await mockServer.request({
      method: 'POST',
      url: PATHS.ADDRESS.CREATE,
      body: {
        country: 'country',
        state: 'state',
        city: 'city',
        street: 'street',
        number: 'number',
        district: 'neighborhood',
        details: 'details',
        zipCode: 'zipCode',
      },
    })
    expect(statusCode).toBe(201)
  })

  test('should be possible to create new address without details', async () => {
    const { statusCode } = await mockServer.request({
      method: 'POST',
      url: PATHS.ADDRESS.CREATE,
      body: {
        country: 'country',
        state: 'state',
        city: 'city',
        street: 'street',
        number: 'number',
        district: 'neighborhood',
        zipCode: 'zipCode',
      },
    })
    expect(statusCode).toBe(201)
  })

  test('should not be possible to create new address with invalid payload', async () => {
    const { statusCode } = await mockServer.request({
      method: 'POST',
      url: PATHS.ADDRESS.CREATE,
      body: {
        country: 'country',
        state: 'state',
        city: 'city',
        street: 'street',
        number: 'number',
        zipCode: 'zipCode',
      },
    })
    expect(statusCode).toBe(400)
  })
})
