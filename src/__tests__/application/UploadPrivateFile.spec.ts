import { UploadPrivateFile } from '@application/UploadPrivateFile';

describe('UploadPrivateFile', () => {
  it('should call storageProvider.upload and tokenService.generateToken', async () => {
    const mockUpload = jest.fn().mockResolvedValue({ id: '1', filename: 'file.txt' });
    const mockGenerateToken = jest.fn().mockReturnValue('token');
    const storageProvider = { upload: mockUpload } as any;
    const tokenService = { generateToken: mockGenerateToken } as any;
    const usecase = new UploadPrivateFile(storageProvider, tokenService);

    const params = {
      file: Buffer.from('test'),
      bucket: 'bucket',
      path: '',
      filename: 'file.txt',
      mimetype: 'text/plain',
      tokenPayload: { foo: 'bar' }
    };

    const result = await usecase.execute(params);

    expect(mockUpload).toHaveBeenCalledWith({ ...params, isPrivate: true });
    expect(mockGenerateToken).toHaveBeenCalledWith(params.tokenPayload);
    expect(result).toEqual({ id: '1', filename: 'file.txt', token: 'token' });
  });
});
