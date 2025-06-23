/**
 * TokenService defines the contract for generating and validating tokens for private files.
 * Implementations: JwtTokenService
 */
export interface TokenService {
  /**
   * Generates a token for a file (e.g., JWT)
   * @param payload - data to encode in the token
   * @returns token string
   */
  generateToken(payload: Record<string, any>): string;

  /**
   * Validates a token and returns the decoded payload if valid
   * @param token - token string
   * @returns decoded payload or throws error if invalid
   */
  validateToken(token: string): Record<string, any>;
}
