import { DataTypes, UUIDV4 } from "sequelize";
import { UserRole, OauthProvider } from "../../../types";

module.exports = (sequelize: any) => {
  sequelize.define(
    "User",
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
      firstname: {
        type: DataTypes.STRING,
      },
      lastname: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      city: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      detailed_geo_info: {
        type: DataTypes.TEXT,
      },
      provider: {
        type: DataTypes.ENUM(
          OauthProvider.FACEBOOK,
          OauthProvider.GOOGLE,
          OauthProvider.LINKEDIN
        ),
        allowNull: false,
      },
      provider_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      downloads_left: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      is_subscribed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      role: {
        type: DataTypes.ENUM(
          UserRole.USER,
          UserRole.PRIVILIGED,
          UserRole.ADMIN,
          UserRole.SUPERADMIN
        ),
        allowNull: false,
        defaultValue: UserRole.USER,
      },
    },
    {
      sequelize,
      tableName: "users",
      underscored: true,
    }
  );
};
