# SS Media Library

A TypeScript media library for uploading and downloading public/private files, supporting local and Google Cloud Storage (GCS) backends. Designed with Clean Architecture, CQRS, and SOLID principles.

## Features
- Upload public and private files
- Download files as stream or buffer
- Pluggable storage providers (local, GCS)
- Token-based access for private files (JWT)
- Rich file metadata

## Installation

```
npm install ss-media-library
```

## Usage Example

```typescript
import { StorageProviderFactory } from '@infrastructure/StorageProviderFactory';
import { JwtTokenService } from '@infrastructure/JwtTokenService';
import { UploadPublicFile } from '@application/UploadPublicFile';
import { UploadPrivateFile } from '@application/UploadPrivateFile';

// Create providers
const storageProvider = StorageProviderFactory.create('local'); // or 'gcs'
const tokenService = new JwtTokenService();

// Upload public file
const uploadPublic = new UploadPublicFile(storageProvider);
const publicMetadata = await uploadPublic.execute({
  file: Buffer.from('hello world'),
  bucket: 'public-bucket',
  path: 'uploads/',
  filename: 'file.txt',
  mimetype: 'text/plain',
});

// Upload private file
const uploadPrivate = new UploadPrivateFile(storageProvider, tokenService);
const privateMetadata = await uploadPrivate.execute({
  file: Buffer.from('secret'),
  bucket: 'private-bucket',
  path: 'uploads/',
  filename: 'secret.txt',
  mimetype: 'text/plain',
  tokenPayload: { userId: 'user-123' },
});
```

## File Metadata Example

```json
{
  "id": "user-123-uuid",
  "filename": "user-123-uuid.txt",
  "originFilename": "file.txt",
  "mimetype": "text/plain",
  "filesize": 1024,
  "bucket": "public-bucket",
  "path": "uploads/",
  "storageType": "local",
  "isPrivate": false,
  "createdAt": "2025-06-23T12:00:00Z",
  "updatedAt": "2025-06-23T12:00:00Z"
}
```

## Testing & Coverage

- Tests are written using Jest.
- To run tests:
  ```
  npm test
  ```
- To check coverage:
  ```
  npm run coverage
  ```

---

For more details, see the source code and inline documentation.
