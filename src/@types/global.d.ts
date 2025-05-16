import { MockServer } from 'e2e/mock/Server.mock'

declare global {
  // eslint-disable-next-line no-var
  var mockServer: MockServer
}

export {}
