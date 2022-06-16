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

  public async getById(id: string) {
    return this.requestRepository.getById(id);
  }

  public async getByEmail(email: string) {
    const user = await this.requestRepository.getByEmail(email);
    return user ? this.requestMapper.toEntity(user) : null;
  }

  public async getUserBooksByType(
    user: any,
    type: "inprogress" | "bookmarks" | "bookmarked" | "completed" | "downloads"
  ) {
    if (type === "bookmarks") {
      type = "bookmarked";
    }

    const books = await this.requestRepository.getUserBooksByType(type, user.id);

    return books.map((book: any) =>
      this.requestMapper.toEntityAdjustedUserBooks(book)
    );
  }
}
