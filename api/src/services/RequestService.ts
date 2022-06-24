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

  public async add(
    FileId: string,
    reason: string,
    action: "block" | "unblock"
  ) {
    const subscriptionDbObject = await this.requestMapper.toDatabase({
      FileId,
      reason,
      action,
    });

    return this.requestMapper.toEntity(
      await this.requestRepository.add(subscriptionDbObject)
    );
  }
}
