import { IInvoice } from "../../types";

export default {
  toDatabase(requestObject: IInvoice) {
    return {
      UserId: requestObject.user_id, // put foreign keys in pascalcase
      SubscriptionId: requestObject.subscription_id,
      filename: requestObject.filename,
      hosted_invoice_url: requestObject.hosted_invoice_url,
      amount_paid: requestObject.amount_paid,
    };
  },

  toEntity(databaseObject: Partial<IInvoice>) {
    return {
      uuid: databaseObject.uuid,
      filename: databaseObject.filename,
      created_at: databaseObject.createdAt!.getTime() / 1000,
    };
  },
};
