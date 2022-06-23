export default class RequestService {
  private requestMapper: any;
  private requestRepository: any;

  constructor({
    requestMapper,
    requestRepository,
  }: {
    requestMapper: any;
    requestRepository: any;
  }) {
    this.requestMapper = requestMapper;
    this.requestRepository = requestRepository;
  }

  public async get(uuid: string, adjustedResult: boolean = true) {
    const file = await this.requestRepository.get(uuid);
    return adjustedResult ? this.requestMapper.toEntity(file) : file;
  }

  public async add(fileId: any, reason: string) {
    const subscriptionDbObject = await this.requestMapper.toDatabase({
      fileId,
      reason,
    });

    return this.requestMapper.toEntity(
      await this.requestRepository.add(subscriptionDbObject)
    );
  }
}
