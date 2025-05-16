import { PATHS } from '@/constants'

describe('List People (e2e)', async () => {
  test('should be possible to list people', async () => {
    const { statusCode, body } = await mockServer.request({
      method: 'GET',
      url: PATHS.PERSON.LIST_ALL,
    })

    const result = JSON.parse(body)

    expect(statusCode).toEqual(200)
    expect(result.people.length).toBeGreaterThan(0)
    expect(result.people[0]).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        documentNumber: expect.any(String),
      }),
    )
    expect(result).toEqual(
      expect.objectContaining({
        total: expect.any(Number),
        page: expect.any(Number),
        count: expect.any(Number),
        perPage: expect.any(Number),
        totalPages: expect.any(Number),
        hasNext: expect.any(Boolean),
        cacheValue: expect.any(String),
      }),
    )
  })
})
