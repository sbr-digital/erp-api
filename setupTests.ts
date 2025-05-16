import 'reflect-metadata'

import { MockServer } from 'e2e/mock/Server.mock'

globalThis.mockServer = new MockServer()

beforeAll(async () => {
  await mockServer.initialize()
})

afterAll(async () => {
  await mockServer.close()
})
