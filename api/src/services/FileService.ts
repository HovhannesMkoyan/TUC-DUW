import { IUser } from "../../types";
export default class UserService {
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

  public async add(file: any, description: string) {
    console.log(file);
    return;
    return this.fileRepository.getById();
  }
}
