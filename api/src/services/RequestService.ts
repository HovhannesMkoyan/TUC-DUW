import { IRequest, ERequestStatus } from "../../types";

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
    const request = await this.requestRepository.getByFileId(fileId);
    return this.requestMapper.toEntity(request);
  }

  public async add(
    FileId: number,
    reason: string,
    action: "block" | "unblock"
  ) {
    const subscriptionDbObject = await this.requestMapper.toDatabase({
      FileId,
      reason,
      action,
    });

    return this.requestRepository.add(subscriptionDbObject);
  }

  public async update(uuid: string, status: ERequestStatus) {
    return this.requestRepository.update({
      uuid,
      status,
    });
  }
}
