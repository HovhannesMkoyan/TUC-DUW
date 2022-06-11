import { DataTypes } from "sequelize";
import { EUserBookActivityStatus } from "../../../types";

module.exports = (sequelize: any) => {
  sequelize.define(
    "UserBookActivity",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      status: {
        type: DataTypes.ENUM(
          EUserBookActivityStatus.BOOKMARKED,
          EUserBookActivityStatus.COMPLETED,
          EUserBookActivityStatus.INPROGRESS
        ),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "user_book_activities",
      underscored: true,
    }
  );
};
