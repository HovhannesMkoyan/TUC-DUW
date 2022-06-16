export default class DownloadService {
  private downloadRepository: any;

  constructor({ downloadRepository }: { downloadRepository: any }) {
    this.downloadRepository = downloadRepository;
  }

  get(userId: string, bookId: string) {
    return this.downloadRepository.get({
      UserId: userId,
      BookId: bookId,
    });
  }

  create(userId: string, bookId: string) {
    return this.downloadRepository.create({
      UserId: userId,
      BookId: bookId,
    });
  }
}
