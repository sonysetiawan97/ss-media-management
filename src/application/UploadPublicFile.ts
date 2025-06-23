/**
 * UseCase: UploadPublicFile
 * Handles uploading a public file using the selected storage provider.
 */
import { StorageProvider } from '@interfaces/StorageProvider';
import { FileMetadata } from '@domain/FileMetadata';

export class UploadPublicFile {
  constructor(private storageProvider: StorageProvider) {}

  async execute(params: {
    file: Buffer;
    bucket: string;
    path: string;
    filename: string;
    mimetype: string;
    ownerId?: string;
  }): Promise<FileMetadata> {
    return this.storageProvider.upload({
      ...params,
      isPrivate: false,
    });
  }
}
