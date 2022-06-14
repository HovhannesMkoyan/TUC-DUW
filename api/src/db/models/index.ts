import { Sequelize } from "sequelize";
import applyAssociations from "./relations/associations";
import hooks from "./relations/hooks";

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const modelDefiners = [
  require("./Book"),
  require("./Tag"),
  require("./User"),
  require("./Subscription"),
  require("./Invoice"),
  require("./SubscriptionCancellation"),
  require("./UserBookActivity"),
  require("./Download"),
  require("./Comment"),
  require("./Goal"),
];

// Define all models according to their files
// for (const modelDefiner of modelDefiners) {
//   modelDefiner(sequelize);
// }

// Add associations
// applyAssociations(sequelize);

// Add hooks
// hooks(sequelize);

export default sequelize;
