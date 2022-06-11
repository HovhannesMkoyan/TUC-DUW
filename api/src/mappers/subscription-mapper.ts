import { ISubscription } from "../../types";

export default {
  toDatabase(requestObject: ISubscription) {
    return {
      UserId: requestObject.user_id, // put foreign keys in pascalcase
      subscription_type: requestObject.subscription_type,
      subscription_status: requestObject.subscription_status,
      next_payment_date: requestObject.next_payment_date,
      stripe_cus_id: requestObject.stripe_cus_id,
      stripe_sub_id: requestObject.stripe_sub_id,
    };
  },

  toEntity(databaseObject: ISubscription) {
    return {
      // id: databaseObject.id,
      // uuid: databaseObject.uuid,
      subscription_type: databaseObject.subscription_type,
      subscription_status: databaseObject.subscription_status,
      next_payment_date: databaseObject.next_payment_date,
      // stripe_cus_id: databaseObject.stripe_cus_id,
      // stripe_sub_id: databaseObject.stripe_sub_id,
    };
  },
};
