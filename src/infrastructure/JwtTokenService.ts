/**
 * JwtTokenService implements TokenService using jsonwebtoken.
 */
import { TokenService } from '@interfaces/TokenService';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'default_secret';

export class JwtTokenService implements TokenService {
  generateToken(payload: Record<string, any>): string {
    // You can add options like expiresIn if payload has exp
    return jwt.sign(payload, SECRET);
  }

  validateToken(token: string): Record<string, any> {
    try {
      return jwt.verify(token, SECRET) as Record<string, any>;
    } catch (err) {
      throw new Error('Invalid or expired token');
    }
  }
}
