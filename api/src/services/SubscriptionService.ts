import {
  SubscriptionType,
  SubscriptionStatus,
  IUser,
  ISubscription,
  SubscriptionCancellationReason,
} from "../../types";

export default class SubscriptionService {
  private subscriptionMapper: any;
  private subscriptionCancellationMapper: any;
  private subscriptionRepository: any;

  constructor({
    subscriptionMapper,
    subscriptionCancellationMapper,
    subscriptionRepository,
  }: {
    subscriptionMapper: any;
    subscriptionCancellationMapper: any;
    subscriptionRepository: any;
  }) {
    this.subscriptionMapper = subscriptionMapper;
    this.subscriptionCancellationMapper = subscriptionCancellationMapper;
    this.subscriptionRepository = subscriptionRepository;
  }

  public async getSubscription(user: IUser) {
    return this.subscriptionRepository.get(user.id);
  }

  public async getSubscriptionByStripeSubId(id: string) {
    return this.subscriptionRepository.getByStripeSubId(id);
  }

  public async createSubscription(
    user: any,
    stripeCusId: string,
    stripeSubId: string,
    subscriptionType: SubscriptionType,
    subscriptionStatus: SubscriptionStatus,
    nextPaymentDate: string
  ) {
    const subscriptionDbObject = await this.subscriptionMapper.toDatabase({
      user_id: user.id,
      subscription_type: subscriptionType,
      subscription_status: subscriptionStatus,
      stripe_cus_id: stripeCusId,
      stripe_sub_id: stripeSubId,
      next_payment_date: nextPaymentDate,
    });

    return this.subscriptionRepository.create(subscriptionDbObject);
  }

  public updateSubscriptionStatus(user: IUser, status: SubscriptionStatus) {
    return this.subscriptionRepository.updateSubscriptionStatus(
      user.id,
      status
    );
  }

  public async createSubscriptionCancellation(
    user: IUser,
    subscription: ISubscription,
    reason: SubscriptionCancellationReason,
    comment: string
  ) {
    const subscriptionDbObject =
      await this.subscriptionCancellationMapper.toDatabase({
        user_id: user.id,
        subscription_id: subscription.id,
        reason,
        comment,
      });

    return this.subscriptionRepository.createSubscriptionCancellation(
      subscriptionDbObject
    );
  }
}
