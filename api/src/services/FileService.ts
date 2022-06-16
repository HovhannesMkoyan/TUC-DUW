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

  public async getById(id: string) {
    return this.fileRepository.getById(id);
  }

  public async getByEmail(email: string) {
    const user = await this.fileRepository.getByEmail(email);
    return user ? this.fileMapper.toEntity(user) : null;
  }

  public async getUserBooksByType(
    user: any,
    type: "inprogress" | "bookmarks" | "bookmarked" | "completed" | "downloads"
  ) {
    if (type === "bookmarks") {
      type = "bookmarked";
    }

    const books = await this.fileRepository.getUserBooksByType(type, user.id);

    return books.map((book: any) =>
      this.fileMapper.toEntityAdjustedUserBooks(book)
    );
  }
}
