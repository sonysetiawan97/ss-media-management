/**
 * LocalStorageProvider implements StorageProvider for local filesystem.
 */
import { StorageProvider } from '@interfaces/StorageProvider';
import { FileMetadata } from '@domain/FileMetadata';
import { Readable } from 'stream';
import { promises as fs, createReadStream, createWriteStream } from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

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
    const baseDir = path.join(process.cwd(), params.bucket, params.path);
    await fs.mkdir(baseDir, { recursive: true });
    const filePath = path.join(baseDir, params.filename);
    const now = new Date();
    let filesize = 0;
    if (Buffer.isBuffer(params.file)) {
      await fs.writeFile(filePath, params.file);
      filesize = params.file.length;
    } else if (params.file instanceof Readable) {
      await new Promise<void>((resolve, reject) => {
        const writeStream = createWriteStream(filePath);
        (params.file as Readable).on('data', (chunk: Buffer) => {
          filesize += chunk.length;
        });
        (params.file as Readable).on('error', reject);
        writeStream.on('error', reject);
        writeStream.on('finish', resolve);
        (params.file as Readable).pipe(writeStream);
      });
    } else {
      throw new Error('Invalid file type: must be Buffer or Readable');
    }
    return {
      id: uuidv4(),
      filename: params.filename,
      originFilename: params.filename,
      mimetype: params.mimetype,
      filesize,
      bucket: params.bucket,
      path: params.path,
      storageType: 'local',
      isPrivate: params.isPrivate,
      createdAt: now,
      updatedAt: now,
      ownerId: params.ownerId,
    };
  }

  async downloadAsStream(params: {
    bucket: string;
    path: string;
    filename: string;
  }): Promise<Readable> {
    const filePath = path.join(process.cwd(), params.bucket, params.path, params.filename);
    return createReadStream(filePath);
  }

  async downloadAsBuffer(params: {
    bucket: string;
    path: string;
    filename: string;
  }): Promise<Buffer> {
    const filePath = path.join(process.cwd(), params.bucket, params.path, params.filename);
    return fs.readFile(filePath);
  }
}
