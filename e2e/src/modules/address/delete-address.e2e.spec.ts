import { PATHS } from '@/constants'
import { prismaForTest } from 'prisma'

describe('Delete Address (e2e)', async () => {
  test('should be possible to delete an address if id exists', async () => {
    const { statusCode } = await mockServer.request({
      method: 'DELETE',
      url: mockServer.parseUrl({
        path: PATHS.ADDRESS.DELETE,
        params: { id: 2 },
      }),
    })
    expect(statusCode).toBe(204)
  })

  test('should not be possible to delete an address if id not exists', async () => {
    const { statusCode } = await mockServer.request({
      method: 'DELETE',
      url: mockServer.parseUrl({
        path: PATHS.ADDRESS.DELETE,
        params: { id: 99 },
      }),
    })

    expect(statusCode).toBe(404)
  })

  test('should not be possible to delete an address if person with address is enable', async () => {
    const person = await prismaForTest.people.findFirst()

    const { statusCode } = await mockServer.request({
      method: 'DELETE',
      url: mockServer.parseUrl({
        path: PATHS.ADDRESS.DELETE,
        params: { id: person!.address_id },
      }),
    })

    expect(statusCode).toBe(403)
  })
})
