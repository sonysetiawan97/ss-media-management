/**
 * GCSStorageProvider implements StorageProvider for Google Cloud Storage.
 */
import { StorageProvider } from '@interfaces/StorageProvider';
import { FileMetadata } from '@domain/FileMetadata';
import { Readable } from 'stream';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';

export class GCSStorageProvider implements StorageProvider {
  private gcs: Storage;

  constructor(gcs: Storage) {
    this.gcs = gcs;
  }

  async upload(params: {
    file: Buffer | Readable;
    bucket: string;
    path: string;
    filename: string;
    mimetype: string;
    isPrivate: boolean;
    ownerId?: string;
  }): Promise<FileMetadata> {
    const bucket = this.gcs.bucket(params.bucket);
    const destPath = params.path + params.filename;
    const file = bucket.file(destPath);
    const now = new Date();
    let filesize = 0;
    if (Buffer.isBuffer(params.file)) {
      await file.save(params.file, { contentType: params.mimetype });
      filesize = params.file.length;
    } else if (params.file instanceof Readable) {
      await new Promise<void>((resolve, reject) => {
        const writeStream = file.createWriteStream({ contentType: params.mimetype });
        (params.file as Readable).on('data', (chunk: Buffer) => {
          filesize += chunk.length;
        });
        (params.file as Readable).on('error', reject);
        writeStream.on('error', reject);
        writeStream.on('finish', resolve);
        (params.file as Readable).pipe(writeStream);
      });
      // Optionally, get file size from GCS metadata if needed
      const [metadata] = await file.getMetadata();
      filesize = Number(metadata.size) || 0;
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
      storageType: 'gcs',
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
    const file = this.gcs.bucket(params.bucket).file(params.path + params.filename);
    return file.createReadStream();
  }

  async downloadAsBuffer(params: {
    bucket: string;
    path: string;
    filename: string;
  }): Promise<Buffer> {
    const file = this.gcs.bucket(params.bucket).file(params.path + params.filename);
    const [contents] = await file.download();
    return contents;
  }
}
