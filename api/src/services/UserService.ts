import { IUser, SubscriptionType } from "../../types";
export default class UserService {
  private userMapper: any;
  private userRepository: any;
  private bookMapper: any;
  private bookRepository: any;
  private goalMapper: any;

  constructor({
    userMapper,
    userRepository,
    bookMapper,
    bookRepository,
    goalMapper,
  }: {
    userMapper: any;
    userRepository: any;
    bookMapper: any;
    bookRepository: any;
    goalMapper: any;
  }) {
    this.userMapper = userMapper;
    this.userRepository = userRepository;
    this.bookMapper = bookMapper;
    this.bookRepository = bookRepository;
    this.goalMapper = goalMapper;
  }

  public async getById(id: string) {
    return this.userRepository.getById(id);
  }

  public async getByEmail(email: string) {
    const user = await this.userRepository.getByEmail(email);
    return user ? this.userMapper.toEntity(user) : null;
  }

  public async getUserBooksByType(
    user: any,
    type: "inprogress" | "bookmarks" | "bookmarked" | "completed" | "downloads"
  ) {
    if (type === "bookmarks") {
      type = "bookmarked";
    }

    const books = await this.bookRepository.getUserBooksByType(type, user.id);

    return books.map((book: any) =>
      this.bookMapper.toEntityAdjustedUserBooks(book)
    );
  }

  public async getReadBooksStatistics(user: any) {
    const bookActivities = await user.getUserBookActivities();

    return bookActivities
      .filter((element: any) => element.status === "completed")
      .map((element: any) => Date.parse(element.updatedAt));
  }

  public setUserSubscribedStatusToTrue(
    user: IUser,
    subscriptionType: SubscriptionType
  ) {
    return this.userRepository.setUserSubscribedStatusToTrue(
      user.uuid,
      subscriptionType
    );
  }

  public setUserSubscribedStatusToFalse(user: IUser) {
    return this.userRepository.setUserSubscribedStatusToFalse(user.uuid);
  }

  public async getGoals(user: any, adjusted: boolean) {
    const goals = await this.userRepository.getGoals(user.id);

    return goals.map((goal: any) => {
      return adjusted
        ? this.goalMapper.toEntityAdjusted(goal)
        : this.goalMapper.toEntity(goal);
    });
  }

  public async createGoal(
    startDate: string,
    endDate: string,
    booksNumber: number,
    title: string,
    user: IUser
  ) {
    const goalDBObject = await this.goalMapper.toDatabase({
      title,
      start_date: startDate,
      end_date: endDate,
      total_books_number: booksNumber,
      UserId: user.id,
    });

    return this.userRepository.createGoal(goalDBObject);
  }
}
