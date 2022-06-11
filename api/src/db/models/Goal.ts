import { DataTypes } from "sequelize";
import { EGoalStatus } from "../../../types";

module.exports = (sequelize: any) => {
  sequelize.define(
    "Goal",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total_books_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      read_books_number: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.ENUM(
          EGoalStatus.SUCCESS,
          EGoalStatus.FAILURE,
          EGoalStatus.INPROGRESS
        ),
        allowNull: false,
        defaultValue: EGoalStatus.INPROGRESS,
      },
    },
    {
      sequelize,
      tableName: "goals",
      underscored: true,
    }
  );
};
