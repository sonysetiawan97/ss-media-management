/**
 * GCSStorageProvider implements StorageProvider for Google Cloud Storage.
 * (Stub implementation, to be completed)
 */
import { StorageProvider } from '@interfaces/StorageProvider';
import { FileMetadata } from '@domain/FileMetadata';
import { Readable } from 'stream';

export class GCSStorageProvider implements StorageProvider {
  async upload(params: {
    file: Buffer | Readable;
    bucket: string;
    path: string;
    filename: string;
    mimetype: string;
    isPrivate: boolean;
    ownerId?: string;
  }): Promise<FileMetadata> {
    // TODO: Implement GCS file upload logic
    throw new Error('Not implemented');
  }

  async downloadAsStream(params: {
    bucket: string;
    path: string;
    filename: string;
  }): Promise<Readable> {
    // TODO: Implement GCS file download as stream
    throw new Error('Not implemented');
  }

  async downloadAsBuffer(params: {
    bucket: string;
    path: string;
    filename: string;
  }): Promise<Buffer> {
    // TODO: Implement GCS file download as buffer
    throw new Error('Not implemented');
  }
}
