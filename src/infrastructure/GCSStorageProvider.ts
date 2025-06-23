/**
 * GCSStorageProvider implements StorageProvider for Google Cloud Storage.
 */
import { StorageProvider } from '@interfaces/StorageProvider';
import { FileMetadata } from '@domain/FileMetadata';
import { Readable } from 'stream';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';

const gcs = new Storage();

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
    const bucket = gcs.bucket(params.bucket);
    const destPath = params.path + params.filename;
    const file = bucket.file(destPath);
    const now = new Date();
    let filesize = 0;
    if (Buffer.isBuffer(params.file)) {
      filesize = params.file.length;
      await new Promise<void>((resolve, reject) => {
        const uploadStream = file.createWriteStream({ metadata: { contentType: params.mimetype } });
        uploadStream.on('error', reject);
        uploadStream.on('finish', resolve);
        uploadStream.end(params.file);
      });
    } else if (params.file instanceof Readable) {
      await new Promise<void>((resolve, reject) => {
        const uploadStream = file.createWriteStream({ metadata: { contentType: params.mimetype } });
        (params.file as Readable).on('data', (chunk: Buffer) => {
          filesize += chunk.length;
        });
        (params.file as Readable).on('error', reject);
        uploadStream.on('error', reject);
        uploadStream.on('finish', resolve);
        (params.file as Readable).pipe(uploadStream);
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
    const file = gcs.bucket(params.bucket).file(params.path + params.filename);
    return file.createReadStream();
  }

  async downloadAsBuffer(params: {
    bucket: string;
    path: string;
    filename: string;
  }): Promise<Buffer> {
    const file = gcs.bucket(params.bucket).file(params.path + params.filename);
    const [contents] = await file.download();
    return contents;
  }
}
