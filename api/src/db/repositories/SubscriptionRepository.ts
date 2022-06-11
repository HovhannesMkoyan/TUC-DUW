import { ISubscription, ISubscriptionCancellation } from "../../../types";
export default class SubscriptionRepository {
  private db: any;
  private logger: any;

  constructor({ db, logger }: { db: any; logger: any }) {
    this.db = db;
    this.logger = logger;
  }

  async get(userId: string) {
    this.logger.info(`DB :: Subscription :: get`, userId);

    return this.db.models.Subscription.findOne({
      where: {
        user_id: userId,
        subscription_status: ["active", "pending-cancellation"],
      },
      order: [["created_at", "DESC"]],
    }).catch((error: any) => console.error("Error: ", error));
  }

  async getByStripeSubId(id: string) {
    this.logger.info(`DB :: Subscription :: getByStripeSubId`, id);

    return this.db.models.Subscription.findOne({
      where: { stripe_sub_id: id },
    }).catch((error: any) => console.error("Error: ", error));
  }

  async create(subscription: Partial<ISubscription>) {
    this.logger.info(`DB :: Subscription :: create`, subscription);

    return this.db.models.Subscription.create(subscription).catch(
      (error: string | undefined) => {
        throw new Error(error);
      }
    );
  }

  async updateSubscriptionStatus(userId: number, status: string) {
    this.logger.info(`DB :: Subscription :: updateSubscriptionStatus`, userId);

    const subscription = await this.db.models.Subscription.findOne({
      where: { UserId: userId },
    });
    subscription.subscription_status = status;
    return subscription.save();
  }

  async createSubscriptionCancellation(
    subscriptionCancellation: Partial<ISubscriptionCancellation>
  ) {
    this.logger.info(
      `DB :: SubscriptionCancellation :: create`,
      subscriptionCancellation
    );

    return this.db.models.SubscriptionCancellation.create(
      subscriptionCancellation
    ).catch((error: string | undefined) => {
      throw new Error(error);
    });
  }
}
