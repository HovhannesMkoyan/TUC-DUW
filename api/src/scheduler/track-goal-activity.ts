import dayjs from "dayjs";

import { container } from "../../dependency-injection-setup";
import { EGoalStatus, IGoal } from "../../types";

const db = container.resolve("db");

module.exports = async () => {
  console.log("GoalActivityTracker Cron Job");
  const goals = await db.models.Goal.findAll({
    logging: false,
    include: {
      model: db.models.UserBookActivity,
    },
  }).catch((error: any) => console.error("Error: ", error));

  goals.forEach(async (goal: IGoal) => {
    if (dayjs(goal.end_date).add(1, "day").isBefore(dayjs())) {
      await goal.update({
        status: EGoalStatus.FAILURE,
        read_books_number: goal.UserBookActivities.length,
      });
    }
  });
};
