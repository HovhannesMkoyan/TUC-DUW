export default class UserRepository {
  private db: any;
  private logger: any;

  constructor({ db, logger }: { db: any; logger: any }) {
    this.db = db;
    this.logger = logger;
  }

  async getById(id: string) {
    this.logger.info(`DB :: User :: getById`, id);

    return this.db.models.User.findOne({ where: { id } }).catch((error: any) =>
      console.error("Error: ", error)
    );
  }

  async getByEmail(email: string) {
    this.logger.info(`DB :: User :: getUserByEmail`, email);

    return this.db.models.User.findOne({ where: { email } })
      .then((user: any) => user)
      .catch((error: any) => console.error("Error: ", error));
  }

  async createUser(user: any) {
    this.logger.info(`DB :: User :: create`, user.email);

    return this.db.models.User.create(user).catch(
      (error: string | undefined) => {
        throw new Error(error);
      }
    );
  }

  async setUserSubscribedStatusToTrue(
    userId: string,
    subscriptionType: "monthly" | "yearly"
  ) {
    this.logger.info(`DB :: User :: setUserSubscribedStatusToTrue`, {
      userId,
      subscriptionType,
    });

    const user = await this.db.models.User.findOne({ where: { uuid: userId } });
    const downloadsNumber =
      subscriptionType === "monthly"
        ? process.env.SUBSCRIPTION_MONTHLY_DOWNLOADS_NUMBER
        : process.env.SUBSCRIPTION_YEARLY_DOWNLOADS_NUMBER;

    user.downloads_left = user.downloads_left + Number(downloadsNumber);
    user.is_subscribed = true;
    await user.save();
  }

  async setUserSubscribedStatusToFalse(userId: string) {
    this.logger.info(`DB :: User :: setUserSubscribedStatusToFalse`, {
      userId,
    });

    const user = await this.db.models.User.findOne({ where: { uuid: userId } });
    user.is_subscribed = false;
    return user.save();
  }

  async getGoals(userId: any) {
    this.logger.info(`DB :: User :: getGoals`, userId);

    return this.db.models.Goal.findAll({
      where: { user_id: userId },
      include: {
        model: this.db.models.UserBookActivity,
      },
    })
      .then((goals: any) => goals)
      .catch((error: any) => console.error("Error: ", error));
  }

  async createGoal(goal: any) {
    this.logger.info(`DB :: User :: createGoal`, goal);

    return this.db.models.Goal.create(goal).catch(
      (error: string | undefined) => {
        throw new Error(error);
      }
    );
  }
}
