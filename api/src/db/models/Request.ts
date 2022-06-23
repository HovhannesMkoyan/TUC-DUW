import { DataTypes, UUIDV4 } from "sequelize";
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
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: UUIDV4,
      },
      type: {
        type: DataTypes.ENUM(ERequestType.BLOCK, ERequestType.UNBLOCK),
        allowNull: false,
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          ERequestStatus.PENDING,
          ERequestStatus.ACCEPTED,
          ERequestStatus.DECLINED
        ),
        defaultValue: ERequestStatus.PENDING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "requests",
      underscored: true,
    }
  );
};
