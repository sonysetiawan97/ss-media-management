/**
 * UseCase: UploadPrivateFile
 * Handles uploading a private file and generating a token.
 */
import { StorageProvider } from '@interfaces/StorageProvider';
import { TokenService } from '@interfaces/TokenService';
import { FileMetadata } from '@domain/FileMetadata';

export class UploadPrivateFile {
  constructor(
    private storageProvider: StorageProvider,
    private tokenService: TokenService
  ) {}

  async execute(params: {
    file: Buffer;
    bucket: string;
    path: string;
    filename: string;
    mimetype: string;
    ownerId?: string;
    tokenPayload?: Record<string, any>;
  }): Promise<FileMetadata> {
    const metadata = await this.storageProvider.upload({
      ...params,
      isPrivate: true,
    });
    const token = this.tokenService.generateToken(params.tokenPayload || { fileId: metadata.id });
    return { ...metadata, token };
  }
}
