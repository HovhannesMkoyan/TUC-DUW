import { DataTypes, UUIDV4 } from "sequelize";

module.exports = (sequelize: any) => {
  sequelize.define(
    "File",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      size: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      data: {
        type: DataTypes.BLOB("long"),
        allowNull: false,
      },
      hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      blocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "files",
      underscored: true,
    }
  );
};
