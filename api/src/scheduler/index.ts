import nodeCron from "node-cron";
import { join } from "path";
const cronitor = require("cronitor")(process.env.CRONITOR_KEY);

import schedulerConfig from "../config/scheduler";
type Values = typeof schedulerConfig[keyof typeof schedulerConfig];

cronitor.wraps(nodeCron);

export default () => {
  Object.keys(schedulerConfig).forEach((key) => {
    let { name, frequency, handler } = (schedulerConfig as any)[key] as Values;

    if (nodeCron.validate(frequency)) {
      cronitor.schedule(name, frequency, () => {
        require(join(__dirname, handler))();
      });
    }
  });
};
