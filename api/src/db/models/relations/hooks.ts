import { EGoalStatus } from "../../../../types";

export default (sequelize: any) => {
  const {
    Book,
    Tag,
    User,
    Subscription,
    Invoice,
    SubscriptionCancellation,
    UserBookActivity,
    Download,
    Goal,
    Comment,
  } = sequelize.models;

  Download.addHook(
    "afterCreate",
    "afterBookDownloadHook",
    async (download: any, options: any) => {
      try {
        await User.decrement("downloads_left", {
          by: 1,
          where: { id: download.UserId },
          transaction: options.transaction,
        });
        return Book.increment("downloads_number", {
          by: 1,
          where: { id: download.BookId },
          transaction: options.transaction,
        });
      } catch (error) {
        console.log("-----1-------", error);
      }
    }
  );

  UserBookActivity.removeHook("afterUpdate", "afterUserBookActivityUpdateHook");
  UserBookActivity.removeHook("afterCreate", "afterUserBookActivityCreateHook");

  UserBookActivity.addHook(
    "afterUpdate",
    "afterUserBookActivityUpdateHook",
    afterUserBookActivityHookFunction
  );

  UserBookActivity.addHook(
    "afterCreate",
    "afterUserBookActivityCreateHook",
    afterUserBookActivityHookFunction
  );

  async function afterUserBookActivityHookFunction(
    activity: any,
    options: any
  ) {
    const goalId = activity.GoalId;
    const goal = await Goal.findOne({ where: { id: goalId } }).then(
      (book: any) => book
    );

    if (goalId && goal.status === EGoalStatus.INPROGRESS) {
      try {
        const numberOfReadBooksForTheGoal = await UserBookActivity.count({
          where: {
            goal_id: goalId,
          },
        });

        const total_books_number = goal.total_books_number;

        await goal.update({
          status:
            numberOfReadBooksForTheGoal >= total_books_number
              ? EGoalStatus.SUCCESS
              : EGoalStatus.INPROGRESS,
          read_books_number:
            numberOfReadBooksForTheGoal >= total_books_number
              ? total_books_number
              : 0,
          transaction: options.transaction,
        });
      } catch (error) {
        console.log("-----1-------", error);
      }
    }
  }
};
