/**
 * JwtTokenService implements TokenService using jsonwebtoken.
 * (Stub implementation, to be completed)
 */
import { TokenService } from '@interfaces/TokenService';

export class JwtTokenService implements TokenService {
  generateToken(payload: Record<string, any>): string {
    // TODO: Implement JWT token generation
    throw new Error('Not implemented');
  }

  validateToken(token: string): Record<string, any> {
    // TODO: Implement JWT token validation
    throw new Error('Not implemented');
  }
}
