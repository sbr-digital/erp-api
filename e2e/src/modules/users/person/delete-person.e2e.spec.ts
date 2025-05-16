import { PATHS } from '@/constants'

import { prismaForTest } from 'prisma'

describe('Delete Person (e2e)', async () => {
  test('should be possible to delete a person if it exists', async () => {
    const person = await prismaForTest.people.findFirst()

    const { statusCode } = await mockServer.request({
      method: 'DELETE',
      url: mockServer.parseUrl({
        path: PATHS.PERSON.DELETE,
        params: { id: person!.id },
      }),
    })

    expect(statusCode).toEqual(204)
  })

  test('should do not be possible to delete a person if it does not exists', async () => {
    const { statusCode } = await mockServer.request({
      method: 'DELETE',
      url: mockServer.parseUrl({
        path: PATHS.PERSON.DELETE,
        params: { id: 99 },
      }),
    })

    expect(statusCode).toEqual(404)
  })
})
