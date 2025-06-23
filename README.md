# SS Media Library

A TypeScript media library for uploading and downloading public/private files, supporting local and Google Cloud Storage (GCS) backends. Designed with Clean Architecture, CQRS, and SOLID principles.

## Features

- Upload public and private files
- Download files as stream or buffer
- Pluggable storage providers (local, GCS)
- Token-based access for private files (JWT)
- Rich file metadata

## Installation

```bash
npm install ss-media-library
```

## Usage Example

### Upload Public File

```typescript
const uploadPublic = new UploadPublicFile(storageProvider);
const publicMetadata = await uploadPublic.execute({
  file: Buffer.from('hello world'),
  bucket: 'public-bucket',
  path: 'uploads/',
  filename: 'file.txt',
  mimetype: 'text/plain',
});
console.log(publicMetadata);
```

### Upload Private File (with ownerId and tokenPayload)

```typescript
const uploadPrivate = new UploadPrivateFile(storageProvider, tokenService);
const privateMetadata = await uploadPrivate.execute({
  file: Buffer.from('secret'),
  bucket: 'private-bucket',
  path: 'uploads/',
  filename: 'secret.txt',
  mimetype: 'text/plain',
  ownerId: 'user-123',
  tokenPayload: {
    fileId: 'user-123-uuid',
    ownerId: 'user-123',
    appId: 'my-app',
    exp: Math.floor(Date.now() / 1000) + 3600 // 1 hour expiry
  }
});
console.log(privateMetadata);
```

### Upload Private File (minimal)

```typescript
const privateMetadata = await uploadPrivate.execute({
  file: Buffer.from('secret'),
  bucket: 'private-bucket',
  path: 'uploads/',
  filename: 'secret.txt',
  mimetype: 'text/plain',
});
console.log(privateMetadata);
```

## File Metadata Returned

All upload methods return a `FileMetadata` object:

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
  "token": null,
  "checksum": null,
  "createdAt": "2025-06-23T12:00:00Z",
  "updatedAt": "2025-06-23T12:00:00Z",
  "expiresAt": null,
  "ownerId": "user-123"
}
```
- For private files, `token` will be a JWT string and may include claims from `tokenPayload`.
- `expiresAt`, `checksum`, and `ownerId` are optional and may be present if set.

## Testing & Coverage

- Tests are written using Jest.
- To run tests:

  ```bash
  npm test
  ```

- To check coverage:

  ```bash
  npm run coverage
  ```

---

For more details, see the source code and inline documentation.
