import { JwtTokenService } from '@infrastructure/JwtTokenService';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('JwtTokenService', () => {
  it('should generate a token', () => {
    (jwt.sign as jest.Mock).mockReturnValue('token');
    const service = new JwtTokenService();
    const token = service.generateToken({ foo: 'bar' });
    expect(token).toBe('token');
  });

  it('should validate a token', () => {
    (jwt.verify as jest.Mock).mockReturnValue({ foo: 'bar' });
    const service = new JwtTokenService();
    const payload = service.validateToken('token');
    expect(payload).toEqual({ foo: 'bar' });
  });

  it('should throw on invalid token', () => {
    (jwt.verify as jest.Mock).mockImplementation(() => { throw new Error('bad'); });
    const service = new JwtTokenService();
    expect(() => service.validateToken('bad')).toThrow('Invalid or expired token');
  });
});
