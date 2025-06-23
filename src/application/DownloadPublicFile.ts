/**
 * UseCase: DownloadPublicFile
 * Handles downloading a public file as stream or buffer.
 */
import { StorageProvider } from '@interfaces/StorageProvider';
import { Readable } from 'stream';

export class DownloadPublicFile {
  constructor(private storageProvider: StorageProvider) {}

  async asStream(params: {
    bucket: string;
    path: string;
    filename: string;
  }): Promise<Readable> {
    return this.storageProvider.downloadAsStream(params);
  }

  async asBuffer(params: {
    bucket: string;
    path: string;
    filename: string;
  }): Promise<Buffer> {
    return this.storageProvider.downloadAsBuffer(params);
  }
}
