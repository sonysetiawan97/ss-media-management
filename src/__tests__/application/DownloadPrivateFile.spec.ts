import { DownloadPrivateFile } from '@application/DownloadPrivateFile';

describe('DownloadPrivateFile', () => {
  it('should validate token and call storageProvider.downloadAsStream', async () => {
    const mockValidateToken = jest.fn();
    const mockDownloadAsStream = jest.fn().mockResolvedValue('stream');
    const storageProvider = { downloadAsStream: mockDownloadAsStream } as any;
    const tokenService = { validateToken: mockValidateToken } as any;
    const usecase = new DownloadPrivateFile(storageProvider, tokenService);
    const params = { bucket: 'bucket', path: '', filename: 'file.txt', token: 'token' };
    const result = await usecase.asStream(params);
    expect(mockValidateToken).toHaveBeenCalledWith('token');
    expect(mockDownloadAsStream).toHaveBeenCalledWith(params);
    expect(result).toBe('stream');
  });

  it('should validate token and call storageProvider.downloadAsBuffer', async () => {
    const mockValidateToken = jest.fn();
    const mockDownloadAsBuffer = jest.fn().mockResolvedValue(Buffer.from('data'));
    const storageProvider = { downloadAsBuffer: mockDownloadAsBuffer } as any;
    const tokenService = { validateToken: mockValidateToken } as any;
    const usecase = new DownloadPrivateFile(storageProvider, tokenService);
    const params = { bucket: 'bucket', path: '', filename: 'file.txt', token: 'token' };
    const result = await usecase.asBuffer(params);
    expect(mockValidateToken).toHaveBeenCalledWith('token');
    expect(mockDownloadAsBuffer).toHaveBeenCalledWith(params);
    expect(result).toEqual(Buffer.from('data'));
  });
});
