/**
 * StorageProviderFactory selects the correct storage provider implementation.
 */
import { StorageProvider } from '@interfaces/StorageProvider';
import { LocalStorageProvider } from '@infrastructure/LocalStorageProvider';
import { GCSStorageProvider } from '@infrastructure/GCSStorageProvider';

export class StorageProviderFactory {
  static create(storageType: 'local' | 'gcs'): StorageProvider {
    if (storageType === 'local') {
      return new LocalStorageProvider();
    }
    if (storageType === 'gcs') {
      return new GCSStorageProvider();
    }
    throw new Error('Unsupported storage type');
  }
}
