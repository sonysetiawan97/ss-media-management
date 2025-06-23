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

## Usage Examples

### 1. Upload Public File

```typescript
const uploadPublic = new UploadPublicFile(storageProvider);
const publicMetadata = await uploadPublic.execute({
  file: Buffer.from('hello world'),
  bucket: 'public-bucket',
  path: 'uploads/',
  filename: 'public-uuid.txt',
  mimetype: 'text/plain',
});
console.log(publicMetadata);
```

### 2. Upload Private File (with ownerId and tokenPayload)

```typescript
const uploadPrivate = new UploadPrivateFile(storageProvider, tokenService);
const privateMetadata = await uploadPrivate.execute({
  file: Buffer.from('secret'),
  bucket: 'private-bucket',
  path: 'user-files/2025/06/',
  filename: 'user-1234-uuidv4.png',
  mimetype: 'image/png',
  ownerId: 'user-1234',
  tokenPayload: {
    fileId: 'user-1234-uuidv4',
    ownerId: 'user-1234',
    appId: 'my-api-app',
    exp: Math.floor(Date.now() / 1000) + 3600 // 1 hour expiry
  }
});
console.log(privateMetadata);
```

### 3. Upload Private File (minimal)

```typescript
const privateMetadata = await uploadPrivate.execute({
  file: Buffer.from('secret'),
  bucket: 'private-bucket',
  path: 'user-files/2025/06/',
  filename: 'user-1234-uuidv4.png',
  mimetype: 'image/png'
  // ownerId and tokenPayload are omitted
});
console.log(privateMetadata);
```

## File Metadata Returned

All upload methods return a `FileMetadata` object with fields like:

```json
{
  "id": "user-1234-uuidv4",
  "filename": "user-1234-uuidv4.png",
  "originFilename": "original.png",
  "mimetype": "image/png",
  "filesize": 123456,
  "bucket": "private-bucket",
  "path": "user-files/2025/06/",
  "storageType": "local",
  "isPrivate": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "checksum": "abc123...",
  "createdAt": "2025-06-23T12:00:00Z",
  "updatedAt": "2025-06-23T12:00:00Z",
  "expiresAt": "2025-06-24T12:00:00Z",
  "ownerId": "user-1234"
}
```

- `token` is only present for private files.
- `ownerId`, `expiresAt`, and `checksum` are optional and depend on your usage.

## Download Examples

### 1. Download Public File

```typescript
const downloadPublic = new DownloadPublicFile(storageProvider);

// As a stream (recommended for large files)
const stream = await downloadPublic.asStream({
  bucket: 'public-bucket',
  path: 'uploads/',
  filename: 'public-uuid.txt',
});
// Use the stream as needed (e.g., pipe to response)

// As a buffer (for small files)
const buffer = await downloadPublic.asBuffer({
  bucket: 'public-bucket',
  path: 'uploads/',
  filename: 'public-uuid.txt',
});
console.log(buffer.toString());
```

### 2. Download Private File

```typescript
const downloadPrivate = new DownloadPrivateFile(storageProvider, tokenService);

// As a stream (requires token)
const privateStream = await downloadPrivate.asStream({
  bucket: 'private-bucket',
  path: 'user-files/2025/06/',
  filename: 'user-1234-uuidv4.png',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' // from metadata.token
});
// Use the stream as needed

// As a buffer (requires token)
const privateBuffer = await downloadPrivate.asBuffer({
  bucket: 'private-bucket',
  path: 'user-files/2025/06/',
  filename: 'user-1234-uuidv4.png',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
});
console.log(privateBuffer.toString());
```

## Error Handling Example

### Download Private File – Invalid Token

If you provide an invalid or expired token when downloading a private file, the library will throw an error.  
You should handle this in your code, for example:

```typescript
try {
  const privateBuffer = await downloadPrivate.asBuffer({
    bucket: 'private-bucket',
    path: 'user-files/2025/06/',
    filename: 'user-1234-uuidv4.png',
    token: 'invalid-or-expired-token'
  });
} catch (error) {
  // Example error handling
  console.error('Failed to download private file:', error.message);
  // error.message might be: "Invalid or expired token"
}
```

**Typical error response:**
```json
{
  "error": "Invalid or expired token"
}
```

- Make sure to catch and handle errors when working with private file downloads.
- The exact error message may vary depending on your `TokenService` implementation.

---

For more details, see the inline documentation and source files.
