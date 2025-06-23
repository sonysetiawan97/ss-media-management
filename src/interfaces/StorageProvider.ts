/**
 * StorageProvider defines the contract for file storage operations.
 * Implementations: LocalStorageProvider, GCSStorageProvider
 */
import { FileMetadata } from '@domain/FileMetadata';
import { Readable } from 'stream';

export interface StorageProvider {
  /**
   * Uploads a file to the storage provider.
   * @param params - upload parameters
   * @returns FileMetadata for the uploaded file
   */
  upload(params: {
    file: Buffer | Readable;
    bucket: string;
    path: string;
    filename: string;
    mimetype: string;
    isPrivate: boolean;
    ownerId?: string;
  }): Promise<FileMetadata>;

  /**
   * Downloads a file as a stream
   */
  downloadAsStream(params: {
    bucket: string;
    path: string;
    filename: string;
  }): Promise<Readable>;

  /**
   * Downloads a file as a buffer
   */
  downloadAsBuffer(params: {
    bucket: string;
    path: string;
    filename: string;
  }): Promise<Buffer>;
}
