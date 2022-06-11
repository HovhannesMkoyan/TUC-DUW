import { DataTypes, UUIDV4 } from "sequelize";
import { SubscriptionType, SubscriptionStatus } from "../../../types";

module.exports = (sequelize: any) => {
  sequelize.define(
    "Subscription",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: UUIDV4,
      },
      subscription_type: {
        type: DataTypes.ENUM(SubscriptionType.MONTHLY, SubscriptionType.YEARLY),
        allowNull: false,
      },
      subscription_status: {
        type: DataTypes.ENUM(
          SubscriptionStatus.PENDING_PAYMENT,
          SubscriptionStatus.ACTIVE,
          SubscriptionStatus.PENDING_CANCELLATION,
          SubscriptionStatus.CANCELLED,
          SubscriptionStatus.EXPIRED
        ),
        allowNull: false,
        defaultValue: SubscriptionStatus.PENDING_PAYMENT,
      },
      next_payment_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stripe_sub_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stripe_cus_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "subscriptions",
      underscored: true,
    }
  );
};
