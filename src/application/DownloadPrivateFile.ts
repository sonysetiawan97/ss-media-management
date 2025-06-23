/**
 * UseCase: DownloadPrivateFile
 * Handles downloading a private file after validating the token.
 */
import { StorageProvider } from '@interfaces/StorageProvider';
import { TokenService } from '@interfaces/TokenService';
import { Readable } from 'stream';

export class DownloadPrivateFile {
  constructor(
    private storageProvider: StorageProvider,
    private tokenService: TokenService
  ) {}

  async asStream(params: {
    bucket: string;
    path: string;
    filename: string;
    token: string;
  }): Promise<Readable> {
    this.tokenService.validateToken(params.token);
    return this.storageProvider.downloadAsStream(params);
  }

  async asBuffer(params: {
    bucket: string;
    path: string;
    filename: string;
    token: string;
  }): Promise<Buffer> {
    this.tokenService.validateToken(params.token);
    return this.storageProvider.downloadAsBuffer(params);
  }
}
