import { DataTypes } from "sequelize";
import { ERequestType, ERequestStatus } from "../../../types";

module.exports = (sequelize: any) => {
  sequelize.define(
    "Request",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: DataTypes.ENUM(ERequestType.BLOCK, ERequestType.UNBLOCK),
        allowNull: false,
      },
      reason: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.ENUM(
          ERequestStatus.PENDING,
          ERequestStatus.ACCEPTED,
          ERequestStatus.DECLINED
        ),
        defaultValue: ERequestStatus.PENDING,
      },
    },
    {
      sequelize,
      tableName: "requests",
      underscored: true,
    }
  );
};
