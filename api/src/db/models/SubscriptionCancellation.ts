import { DataTypes } from "sequelize";
import { SubscriptionCancellationReason } from "../../../types";

module.exports = (sequelize: any) => {
  sequelize.define(
    "SubscriptionCancellation",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      reason: {
        type: DataTypes.ENUM(
          SubscriptionCancellationReason.IS_COSTLY,
          SubscriptionCancellationReason.IS_REDUNDANT,
          SubscriptionCancellationReason.FOUND_ALTERNATIVE,
          SubscriptionCancellationReason.OTHER_REASON
        ),
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      tableName: "subscription_cancellations",
      underscored: true,
    }
  );
};
