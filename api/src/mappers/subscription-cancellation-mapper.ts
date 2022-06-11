import { ISubscriptionCancellation } from "../../types";

export default {
  toDatabase(requestObject: ISubscriptionCancellation) {
    return {
      UserId: requestObject.user_id,
      SubscriptionId: requestObject.subscription_id,
      reason: requestObject.reason,
      comment: requestObject.comment,
    };
  },

  toEntity(databaseObject: ISubscriptionCancellation) {
    return {};
  },
};
