import sinon from 'sinon'

import { AuthenticationError } from '@/errors'

import { IJwtTokenService } from '../../../domain'

export class MockJwtTokenService implements IJwtTokenService {
  async generateToken(payload: object, expiresIn: string): Promise<string> {
    return sinon
      .stub()
      .withArgs(payload, expiresIn)
      .callsFake(() => 'fake-token')()
  }

  async verifyToken(): Promise<void> {
    try {
      await Promise.resolve(sinon.stub().returns)
    } catch (error) {
      throw new AuthenticationError({ resource: 'verifyToken' })
    }
  }
}
