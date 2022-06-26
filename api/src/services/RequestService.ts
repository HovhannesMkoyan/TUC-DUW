import { IRequest } from "../../types";

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

  public async getAll() {
    const requests = await this.requestRepository.getAll();

    return requests.map((request: IRequest) =>
      this.requestMapper.toEntity(request)
    );
  }

  public async get(fileId: number) {
    const request = await this.requestRepository.get(fileId);
    return this.requestMapper.toEntity(request);
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
