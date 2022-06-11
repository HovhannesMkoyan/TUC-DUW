import { Router } from "express";

import { container } from "../../dependency-injection-setup";
import authenticate from "../middlewares/authenticate";
import isPremium from "../middlewares/is-premium";

const SubscriptionController = container.resolve("subscriptionController");
const UserController = container.resolve("userController");
const router = Router();

router.get("/:user_id/books", authenticate, UserController.getUserBooksByType);
router.get(
  "/:user_id/read-books-stats",
  authenticate,
  UserController.getReadBooksStatistics
);
router.get("/:user_id/goals", authenticate, UserController.getGoals);
router.post(
  "/:user_id/goals",
  authenticate,
  isPremium,
  UserController.createGoal
);

router.get(
  "/:user_id/subscription",
  authenticate,
  SubscriptionController.getUserSubscription
);
router.post(
  "/:user_id/subscription",
  authenticate,
  SubscriptionController.createStripeSubscription
);
router.put(
  "/:user_id/subscription",
  authenticate,
  SubscriptionController.subscribeUser
);
router.post(
  "/:user_id/subscription/cancel",
  authenticate,
  SubscriptionController.cancelSubscription
);
router.post(
  "/:user_id/subscription/reactivate",
  authenticate,
  SubscriptionController.reactivateSubscription
);
router.get(
  "/:user_id/subscription/card",
  authenticate,
  SubscriptionController.getUserCard
);
router.put(
  "/:user_id/subscription/card",
  authenticate,
  SubscriptionController.updateUserCard
);

router.get(
  "/:user_id/invoices",
  authenticate,
  SubscriptionController.getInvoices
);
router.get(
  "/:user_id/invoices/:invoice_id",
  authenticate,
  SubscriptionController.downloadInvoice
);

router.post(
  "/subscriptions/838c07a5c24f46ec2a8cb167be488d7530843f41e885d7c8e49c401756b25ea0",
  SubscriptionController.handleWebhook
);

export default router;
