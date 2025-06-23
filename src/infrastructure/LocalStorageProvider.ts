/**
 * LocalStorageProvider implements StorageProvider for local filesystem.
 * (Stub implementation, to be completed)
 */
import { StorageProvider } from '@interfaces/StorageProvider';
import { FileMetadata } from '@domain/FileMetadata';
import { Readable } from 'stream';

export class LocalStorageProvider implements StorageProvider {
  async upload(params: {
    file: Buffer | Readable;
    bucket: string;
    path: string;
    filename: string;
    mimetype: string;
    isPrivate: boolean;
    ownerId?: string;
  }): Promise<FileMetadata> {
    // TODO: Implement local file upload logic
    throw new Error('Not implemented');
  }

  async downloadAsStream(params: {
    bucket: string;
    path: string;
    filename: string;
  }): Promise<Readable> {
    // TODO: Implement local file download as stream
    throw new Error('Not implemented');
  }

  async downloadAsBuffer(params: {
    bucket: string;
    path: string;
    filename: string;
  }): Promise<Buffer> {
    // TODO: Implement local file download as buffer
    throw new Error('Not implemented');
  }
}
