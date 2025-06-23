import { StorageProviderFactory } from '@infrastructure/StorageProviderFactory';
import { UploadPublicFile } from '@application/UploadPublicFile';
import { UploadPrivateFile } from '@application/UploadPrivateFile';
import { JwtTokenService } from '@infrastructure/JwtTokenService';

describe('SS Media Library', () => {
  it('should create a local storage provider', () => {
    const provider = StorageProviderFactory.create('local');
    expect(provider).toBeDefined();
  });

  it('should create a GCS storage provider', () => {
    const provider = StorageProviderFactory.create('gcs');
    expect(provider).toBeDefined();
  });

  it('should instantiate JwtTokenService', () => {
    const tokenService = new JwtTokenService();
    expect(tokenService).toBeDefined();
  });

  it('should throw on upload public file (stub)', async () => {
    const provider = StorageProviderFactory.create('local');
    const usecase = new UploadPublicFile(provider);
    await expect(usecase.execute({
      file: Buffer.from('test'),
      bucket: 'bucket',
      path: '',
      filename: 'file.txt',
      mimetype: 'text/plain',
    })).rejects.toThrow('Not implemented');
  });

  it('should throw on upload private file (stub)', async () => {
    const provider = StorageProviderFactory.create('local');
    const tokenService = new JwtTokenService();
    const usecase = new UploadPrivateFile(provider, tokenService);
    await expect(usecase.execute({
      file: Buffer.from('test'),
      bucket: 'bucket',
      path: '',
      filename: 'file.txt',
      mimetype: 'text/plain',
    })).rejects.toThrow('Not implemented');
  });
});
