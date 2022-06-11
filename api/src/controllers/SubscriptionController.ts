import path from "path";
import { Request, Response } from "express";
import { IMappers, IServices, IUser } from "../../types";

export default class SubscriptionController {
  private subscriptionMapper: any;
  private userService: any;
  private stripeService: any;
  private subscriptionService: any;
  private invoiceService: any;

  constructor({
    subscriptionMapper,
    userService,
    stripeService,
    subscriptionService,
    invoiceService,
  }: IServices & IMappers) {
    this.subscriptionMapper = subscriptionMapper;
    this.userService = userService;
    this.stripeService = stripeService;
    this.subscriptionService = subscriptionService;
    this.invoiceService = invoiceService;
  }

  /**
   * Get user subscription
   *
   */
  public getUserSubscription = async (req: Request, res: Response) => {
    try {
      const subscription = await this.subscriptionService.getSubscription(
        req.user
      );
      const adjustedSubscription = subscription
        ? this.subscriptionMapper.toEntity(subscription)
        : null;

      return res.status(200).json(adjustedSubscription);
    } catch (error) {
      return res.status(500).send();
    }
  };

  /**
   * Create subscription in Stripe system
   *
   */
  public createStripeSubscription = async (req: Request, res: Response) => {
    const { payment_method, subscription_type } = req.body;
    const user = req.user as IUser;

    if (!user.is_subscribed) {
      try {
        // Create customer in Stripe platform
        const customer = await this.stripeService.createCustomer(
          payment_method,
          user
        );

        // Create subscription in Stripe platform
        const subscription = await this.stripeService.createSubscription(
          customer.id,
          user,
          subscription_type
        );

        return res.status(202).json({
          status: subscription.status,
          client_secret: subscription.client_secret,
          subscription_id: subscription.id,
          customer_id: customer.id,
        });
      } catch (error: any) {
        console.log(error);
        return res.status(400).json({
          s_error_code: error.decline_code || error.code,
        });
      }
    }

    return res.status(400).json({
      message: "User already has a subscription",
    });
  };

  /**
   * Create Subscription DB record
   *
   */
  public subscribeUser = async (req: Request, res: Response) => {
    const user: any = req.user;
    const { subscription_type, subscription_id, customer_id } = req.body;

    try {
      const subscription = await this.stripeService.getSubscription(
        subscription_id
      );

      await this.subscriptionService.createSubscription(
        user,
        customer_id,
        subscription.id,
        subscription_type,
        "active",
        subscription.current_period_end
      );

      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(400).send();
    }
  };

  /**
   * Get user card (last 4 numbers)
   *
   */
  public getUserCard = async (req: Request, res: Response) => {
    try {
      const subscription = await this.subscriptionService.getSubscription(
        req.user
      );

      const card = await this.stripeService.getCard(subscription.stripe_cus_id);

      return res.status(200).json({
        card: {
          last4: card.last4,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send();
    }
  };

  /**
   * Update user card
   *
   */
  public updateUserCard = async (req: Request, res: Response) => {
    const { payment_method } = req.body;
    const subscription = await this.subscriptionService.getSubscription(
      req.user
    );

    try {
      await this.stripeService.updateCard(
        payment_method,
        subscription.stripe_cus_id
      );

      return res.status(204).send();
    } catch (error) {
      return res.status(500).send();
    }
  };

  /**
   * Cancel subscription
   *
   */
  public cancelSubscription = async (req: Request, res: Response) => {
    const { reason, comment } = req.body;

    const subscription = await this.subscriptionService.getSubscription(
      req.user
    );

    try {
      await this.stripeService.cancelSubscription(subscription.stripe_sub_id);

      // Update subscription status
      await this.subscriptionService.updateSubscriptionStatus(
        req.user,
        "pending-cancellation"
      );

      // Create subscription cancellation record
      await this.subscriptionService.createSubscriptionCancellation(
        req.user,
        subscription,
        reason,
        comment
      );

      return res.status(204).send();
    } catch (error) {
      console.log({ error });
      return res.status(500).send();
    }
  };

  /**
   * Reactivate subscription
   *
   */
  public reactivateSubscription = async (req: Request, res: Response) => {
    const subscription = await this.subscriptionService.getSubscription(
      req.user
    );

    try {
      await this.stripeService.reactivateSubscription(
        subscription.stripe_sub_id
      );

      // Update user subscription status
      await this.subscriptionService.updateSubscriptionStatus(
        req.user,
        "active"
      );

      return res.status(204).send();
    } catch (error) {
      console.log({ error });
      return res.status(500).send();
    }
  };

  /**
   * Get all invoices
   *
   */
  public getInvoices = async (req: Request, res: Response) => {
    try {
      const invoices = await this.invoiceService.getAll(req.user);
      return res.status(200).json(invoices);
    } catch (error) {
      console.log({ error });
      return res.status(500).send();
    }
  };

  /**
   * Download invoice
   *
   */
  public downloadInvoice = async (req: Request, res: Response) => {
    if (req.headers.accept === "application/pdf") {
      try {
        const invoice = await this.invoiceService.get(req.params.invoice_id);

        return res.download(
          path.resolve(
            __dirname,
            "../../../api",
            `files/invoices/${invoice.filename}`
          )
        );
      } catch (error) {
        console.log({ error });
        return res.status(500).send();
      }
    }

    return res.status(406).send();
  };

  /**
   * Handling webhooks
   *
   */
  public handleWebhook = async (req: Request, res: Response) => {
    const signature = req.headers["stripe-signature"];

    try {
      const event = await this.stripeService.verifyWebhookSingature(
        (req as any).rawBody,
        signature
      );

      console.log(event.type);
      if (event.type === "invoice.payment_succeeded") {
        const invoiceObject = event.data.object;
        const subscription =
          await this.subscriptionService.getSubscriptionByStripeSubId(
            invoiceObject.subscription
          );
        const user = await this.userService.getById(subscription.UserId);

        await this.userService.setUserSubscribedStatusToTrue(
          user,
          subscription.subscription_type
        );

        await this.invoiceService.create(
          user,
          subscription,
          invoiceObject.number,
          invoiceObject.hosted_invoice_url,
          invoiceObject.amount_paid / 100
        );
      } else if (event.type === "customer.subscription.deleted") {
        const subscriptionObject = event.data.object;
        const subscription =
          await this.subscriptionService.getSubscriptionByStripeSubId(
            subscriptionObject.id
          );
        const user = await this.userService.getById(subscription.UserId);

        await this.subscriptionService.updateSubscriptionStatus(
          user,
          "cancelled"
        );

        await this.userService.setUserSubscribedStatusToFalse(user);
      }

      return res.status(200).send();
    } catch (err: any) {
      console.log(err);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  };
}
