import { PATHS } from '@/constants'

import { prismaForTest } from 'prisma'

describe('Create Users (e2e)', async () => {
  let body: Record<string, unknown>

  beforeEach(() => {
    body = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'Password123!',
      role: 'MEMBER',
    }
  })

  test('should be able to create new user', async () => {
    const { statusCode } = await mockServer.request({
      method: 'POST',
      url: PATHS.USERS.CREATE,
      body,
    })

    const user = await prismaForTest.user.findFirst({
      where: { email: 'johndoe@example.com' },
    })

    expect(user?.email).toEqual('johndoe@example.com')
    expect(user?.name).toEqual('John Doe')
    expect(statusCode).toEqual(201)
  })

  test('should be possible tocreated a user new user even if the password is not provided', async () => {
    const { statusCode } = await mockServer.request({
      method: 'POST',
      url: PATHS.USERS.CREATE,
      body: {
        name: 'John Doe',
        email: 'johndoe-oth@example.com',
        role: 'MEMBER',
      },
    })

    const user = await prismaForTest.user.findFirst({
      where: { email: 'johndoe-oth@example.com' },
    })

    expect(user?.email).toEqual('johndoe-oth@example.com')
    expect(user?.password).not.eq(undefined)
    expect(statusCode).toEqual(201)
  })

  test('should not be created a user with the same email', async () => {
    const { statusCode } = await mockServer.request({
      method: 'POST',
      url: PATHS.USERS.CREATE,
      body,
    })

    expect(statusCode).toEqual(409)
  })

  test('should not be created a user with invalid payload', async () => {
    body.email = 'fail-email'

    const { statusCode } = await mockServer.request({
      method: 'POST',
      url: PATHS.USERS.CREATE,
      body,
    })

    expect(statusCode).toEqual(400)
  })

  test('should not be created a user with invalid password', async () => {
    body.password = 'bad-password'

    const { statusCode } = await mockServer.request({
      method: 'POST',
      url: PATHS.USERS.CREATE,
      body,
    })

    expect(statusCode).toEqual(400)
  })
})
