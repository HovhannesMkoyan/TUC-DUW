const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default class StripeService {
  async createCustomer(payment_method: string, user: any) {
    try {
      return stripe.customers.create({
        payment_method,
        email: user.email,
        description: `${user.firstname} ${user.lastname}`,
        invoice_settings: {
          default_payment_method: payment_method,
        },
        metadata: {
          Provider: user.provider,
          "Provider ID": user.provider_id,
        },
      });
    } catch (error: any) {
      console.error(error);
      throw {
        success: false,
        status: error.code,
        message: "Error happened while creating a customer",
      };
    }
  }

  async createSubscription(
    customer_id: string,
    user: any,
    subscriptionType: "monthly" | "yearly"
  ) {
    const priceId =
      subscriptionType === "monthly"
        ? process.env.STRIPE_MONTHLY_PRICE_ID
        : process.env.STRIPE_YEARLY_PRICE_ID;

    try {
      const subscription = await stripe.subscriptions.create({
        customer: customer_id,
        items: [{ price: priceId }],
        payment_behavior: "allow_incomplete",
        expand: ["latest_invoice.payment_intent"],
        metadata: {
          "Full name": `${user.firstname} ${user.lastname}`,
          Provider: user.provider,
          "Provider ID": user.provider_id,
        },
      });

      return {
        status: subscription.status,
        invoiceNumber: this.getLatestInvoice(subscription),
        client_secret: subscription.latest_invoice.payment_intent.client_secret,
        id: subscription.id,
      };
    } catch (error: any) {
      console.error(error);
      throw {
        success: false,
        status: error.code,
        message: "Error happened while creating a subscription",
      };
    }
  }

  public getSubscription(subscriptionId: string) {
    try {
      return stripe.subscriptions.retrieve(subscriptionId);
    } catch (error: any) {
      console.error(error);
      throw {
        success: false,
        status: error.code,
        message: `Error happened while retrieving the subscription with ID ${subscriptionId}`,
      };
    }
  }

  public cancelSubscription(subscriptionId: string) {
    try {
      return stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });
    } catch (error: any) {
      console.error(error);
      throw {
        success: false,
        status: error.code,
        message: `Error happened while cancelling the subscription with ID ${subscriptionId}`,
      };
    }
  }

  public reactivateSubscription(subscriptionId: string) {
    try {
      return stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: false,
      });
    } catch (error: any) {
      console.error(error);
      throw {
        success: false,
        status: error.code,
        message: `Error happened while resuming the subscription with ID ${subscriptionId}`,
      };
    }
  }

  public async getInvoice(invoiceId: string) {
    try {
      return stripe.invoices.retrieve(invoiceId);
    } catch (error: any) {
      console.error(error);
      throw {
        status: error.code,
        message: `Error happened while retrieving an invoice with ID ${invoiceId}`,
      };
    }
  }

  public async getCard(customerId: string) {
    const card = await this.retrieveCard(customerId);
    return card.data[0].card;
  }

  public async updateCard(paymentMethodId: string, customerId: string) {
    try {
      // Attach the new card to the user
      const newCard = await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      });

      // Set the card as default
      return stripe.customers.update(customerId, {
        invoice_settings: { default_payment_method: newCard.id },
      });
    } catch (error: any) {
      console.error(error);
      throw {
        status: error.code,
        message: `Error happened while updating a card for customer with ID ${customerId}`,
      };
    }
  }

  private retrieveCard = (customerId: string) =>
    stripe.customers.listPaymentMethods(customerId, { type: "card" });

  private getLatestInvoice = (subscription: any) =>
    subscription.latest_invoice.number;

  public verifyWebhookSingature(requestBody: any, signature: any) {
    return stripe.webhooks.constructEvent(
      requestBody,
      signature,
      process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET
    );
  }
}
