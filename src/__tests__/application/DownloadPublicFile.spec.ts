import { DownloadPublicFile } from '@application/DownloadPublicFile';

describe('DownloadPublicFile', () => {
  it('should call storageProvider.downloadAsStream', async () => {
    const mockDownloadAsStream = jest.fn().mockResolvedValue('stream');
    const storageProvider = { downloadAsStream: mockDownloadAsStream } as any;
    const usecase = new DownloadPublicFile(storageProvider);
    const params = { bucket: 'bucket', path: '', filename: 'file.txt' };
    const result = await usecase.asStream(params);
    expect(mockDownloadAsStream).toHaveBeenCalledWith(params);
    expect(result).toBe('stream');
  });

  it('should call storageProvider.downloadAsBuffer', async () => {
    const mockDownloadAsBuffer = jest.fn().mockResolvedValue(Buffer.from('data'));
    const storageProvider = { downloadAsBuffer: mockDownloadAsBuffer } as any;
    const usecase = new DownloadPublicFile(storageProvider);
    const params = { bucket: 'bucket', path: '', filename: 'file.txt' };
    const result = await usecase.asBuffer(params);
    expect(mockDownloadAsBuffer).toHaveBeenCalledWith(params);
    expect(result).toEqual(Buffer.from('data'));
  });
});
