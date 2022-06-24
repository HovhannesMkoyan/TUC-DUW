export default class UserService {
  private fileMapper: any;
  private fileRepository: any;
  private crypto: any;

  constructor({
    fileMapper,
    fileRepository,
    crypto,
  }: {
    fileMapper: any;
    fileRepository: any;
    crypto: any;
  }) {
    this.fileMapper = fileMapper;
    this.fileRepository = fileRepository;
    this.crypto = crypto;
  }

  public async get(uuid: string, adjustedResult: boolean = true) {
    const file = await this.fileRepository.get(uuid);
    return adjustedResult ? this.fileMapper.toEntity(file) : file;
  }

  public async add(file: any, description: string) {
    if (file.truncated) {
      throw new Error("File size exceeds 10 MG");
    } else {
      const { name, data: buffer, size } = file;

      const hash = this.crypto
        .createHash("sha256")
        .update(buffer)
        .digest("hex");

      const subscriptionDbObject = await this.fileMapper.toDatabase({
        name,
        description,
        size,
        data: buffer,
        hash,
      });

      return this.fileMapper.toEntity(
        await this.fileRepository.add(subscriptionDbObject)
      );
    }
  }

  public async checkStatus(uuid: string) {
    const file = await this.fileRepository.get(uuid);
    return this.fileMapper.toEntity(file);
  }
}
