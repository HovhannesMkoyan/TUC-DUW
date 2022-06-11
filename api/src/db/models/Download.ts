import { DataTypes } from "sequelize";

module.exports = (sequelize: any) => {
  sequelize.define(
    "Download",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: "downloads",
      underscored: true,
    }
  );
};
