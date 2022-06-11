import { DataTypes, UUIDV4 } from "sequelize";

module.exports = (sequelize: any) => {
  sequelize.define(
    "Book",
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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
      },
      publisher: {
        type: DataTypes.STRING,
      },
      pages_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reading_time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      downloads_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cover: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      visible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "books",
      underscored: true,
    }
  );
};
