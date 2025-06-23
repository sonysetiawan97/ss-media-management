/**
 * FileMetadata represents the essential information about a stored file.
 * This metadata is returned after upload and can be saved by the consuming app.
 */
export interface FileMetadata {
  /** Unique identifier for the file (UUID, with optional prefix for context/scoping) */
  id: string;
  /** The actual filename used in storage (should be unique, e.g., UUID + extension) */
  filename: string;
  /** The original filename as uploaded by the user */
  originFilename: string;
  /** MIME type of the file (e.g., 'image/png', 'application/pdf') */
  mimetype: string;
  /** Size of the file in bytes */
  filesize: number;
  /** Name of the storage bucket (local folder or GCS bucket) */
  bucket: string;
  /** Path within the bucket/folder (can be used for subdirectories) */
  path: string;
  /** Where the file is stored: 'local' or 'gcs' */
  storageType: 'local' | 'gcs';
  /** Whether the file is private (requires token for access) */
  isPrivate: boolean;
  /** Token for private file access (JWT or similar), only present for private files */
  token?: string;
  /** Optional checksum for file integrity verification (e.g., SHA256) */
  checksum?: string;
  /** Timestamp when the file was created */
  createdAt: Date;
  /** Timestamp when the file was last updated */
  updatedAt: Date;
  /** Optional expiry for token (if used) */
  expiresAt?: Date;
  /** Optional owner/user ID for tracking file ownership */
  ownerId?: string;
}
