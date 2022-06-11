import { DataTypes } from "sequelize";

module.exports = (sequelize: any) => {
  sequelize.define(
    "Comment",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "comments",
      underscored: true,
    }
  );
};
