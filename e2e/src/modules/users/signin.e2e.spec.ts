import { PATHS } from '@/constants'

describe('Signin(e2e)', async () => {
  test('should be possible to signin a user with valid credentials', async () => {
    await mockServer.request({
      method: 'POST',
      url: PATHS.USERS.CREATE,
      body: {
        name: 'John Doe',
        email: 'testin-authg@example.com',
        password: 'Password123!',
        role: 'ASSOCIATE',
      },
    })

    const { statusCode, json } = await mockServer.request({
      method: 'POST',
      url: PATHS.SIGN_IN,
      body: {
        email: 'testin-authg@example.com',
        password: 'Password123!',
      },
    })

    expect(json()).toEqual({ token: expect.any(String) })
    expect(statusCode).toEqual(200)
  })

  test('should not be possible to signin a user with invalid credentials', async () => {
    const { statusCode } = await mockServer.request({
      method: 'POST',
      url: PATHS.SIGN_IN,
      body: {
        email: 'testing@example.com',
        password: 'Password123!fail',
      },
    })

    expect(statusCode).toEqual(401)
  })

  test('should not be possible to signin a user with invalid email', async () => {
    const { statusCode } = await mockServer.request({
      method: 'POST',
      url: PATHS.SIGN_IN,
      body: {
        email: 'fail-email@email.com',
        password: 'Password123!',
      },
    })

    expect(statusCode).toEqual(401)
  })
})
