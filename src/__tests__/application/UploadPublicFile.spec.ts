import { UploadPublicFile } from '@application/UploadPublicFile';

describe('UploadPublicFile', () => {
  it('should call storageProvider.upload with correct params', async () => {
    const mockUpload = jest.fn().mockResolvedValue({ id: '1', filename: 'file.txt' });
    const storageProvider = { upload: mockUpload } as any;
    const usecase = new UploadPublicFile(storageProvider);

    const params = {
      file: Buffer.from('test'),
      bucket: 'bucket',
      path: '',
      filename: 'file.txt',
      mimetype: 'text/plain',
    };

    const result = await usecase.execute(params);

    expect(mockUpload).toHaveBeenCalledWith({ ...params, isPrivate: false });
    expect(result).toEqual({ id: '1', filename: 'file.txt' });
  });
});
