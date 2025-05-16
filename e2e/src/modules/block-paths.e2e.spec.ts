import { env } from '@/infra'

describe('BlockPaths(e2e)', async () => {
  const paths = env.BLOCK_PREFIXES

  test('should not be possible to access a blocked URL', async () => {
    const { statusCode: testOne } = await mockServer.request({
      method: 'GET',
      url: paths[0],
    })

    expect(testOne).toEqual(403)

    const { statusCode: testTwo } = await mockServer.request({
      method: 'GET',
      url: paths[1],
    })

    expect(testTwo).toEqual(403)

    const { statusCode: testThree } = await mockServer.request({
      method: 'GET',
      url: paths[2],
    })

    expect(testThree).toEqual(403)
  })
})
