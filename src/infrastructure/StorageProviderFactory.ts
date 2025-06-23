/**
 * StorageProviderFactory selects the correct storage provider implementation.
 */
import { StorageProvider } from '@interfaces/StorageProvider';
import { LocalStorageProvider } from '@infrastructure/LocalStorageProvider';
import { GCSStorageProvider } from '@infrastructure/GCSStorageProvider';
import { Storage } from '@google-cloud/storage';

export class StorageProviderFactory {
  static create(storageType: 'local'): StorageProvider;
  static create(storageType: 'gcs', gcsInstance: Storage): StorageProvider;
  static create(storageType: 'local' | 'gcs', gcsInstance?: Storage): StorageProvider {
    if (storageType === 'local') {
      return new LocalStorageProvider();
    }
    if (storageType === 'gcs') {
      if (!gcsInstance) throw new Error('GCS instance required for gcs storage');
      return new GCSStorageProvider(gcsInstance);
    }
    throw new Error('Unsupported storage type');
  }
}
