import { IGoal } from "../../types";

export default {
  toDatabase(requestObject: IGoal) {
    return {
      title: requestObject.title,
      start_date: requestObject.start_date,
      end_date: requestObject.end_date,
      total_books_number: requestObject.total_books_number,
      UserId: requestObject.UserId,
    };
  },

  toEntity(databaseObject: Partial<IGoal>) {
    return {
      title: databaseObject.title,
      start_date: databaseObject.start_date,
      end_date: databaseObject.end_date,
      total_books_number: databaseObject.total_books_number,
      // current_read_books_number:
      //   databaseObject.status === "success"
      //     ? undefined
      //     : databaseObject.UserBookActivities!.length,
      current_read_books_number:
        databaseObject.status === "inprogress"
          ? databaseObject.UserBookActivities!.length
          : undefined,
      read_books_number:
        databaseObject.status === "failure"
          ? databaseObject.read_books_number
          : undefined,
      status: databaseObject.status,
    };
  },

  toEntityAdjusted(databaseObject: Partial<IGoal>) {
    return {
      id: databaseObject.id,
      title: databaseObject.title,
      status: databaseObject.status,
    };
  },
};
