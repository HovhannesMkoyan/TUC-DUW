import { DataTypes, UUIDV4 } from "sequelize";

module.exports = (sequelize: any) => {
  sequelize.define(
    "Invoice",
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
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hosted_invoice_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount_paid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "invoices",
      underscored: true,
    }
  );
};
