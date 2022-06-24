export default class BlocklistService {
  private fileMapper: any;
  private fileRepository: any;

  constructor({
    fileMapper,
    fileRepository,
  }: {
    fileMapper: any;
    fileRepository: any;
  }) {
    this.fileMapper = fileMapper;
    this.fileRepository = fileRepository;
  }

  public async block(
    hash: string = "ac7bb853c1dbf0866c170ab97779ba2c08f55e88be541d5b4e4208913b76439a"
  ) {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  public async unblock(hash: string) {}
}
