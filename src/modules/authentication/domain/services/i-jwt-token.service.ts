export interface IJwtTokenService {
  generateToken(payload: object, expiresIn: string): Promise<string>
  verifyToken(token: string): Promise<void>
}
