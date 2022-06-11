import { DataTypes } from "sequelize";

module.exports = (sequelize: any) => {
  sequelize.define(
    "Tag",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tag_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tag_slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "tags",
      underscored: true,
    }
  );
};
