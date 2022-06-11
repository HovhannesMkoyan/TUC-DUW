import { getMonthName } from "../../../helpers/date-manipulations";

export default function GoalInfo({ goal }: { goal: any }) {
  return (
    <div className="eb-modal-single-goal_container">
      <h3>Նպատակի մասին</h3>
      <div>
        <p>Անվանում - {goal.title}</p>
        <p>
          Սկիզբ -{" "}
          {`${getMonthName(
            (new Date(Date.parse(goal.start_date)).getMonth() + 1).toString()
          )} ${new Date(Date.parse(goal.start_date)).getDate()}, ${new Date(
            Date.parse(goal.start_date)
          ).getFullYear()} `}
        </p>
        <p>
          Ավարտ -{" "}
          {`${getMonthName(
            (new Date(Date.parse(goal.end_date)).getMonth() + 1).toString()
          )} ${new Date(Date.parse(goal.end_date)).getDate()}, ${new Date(
            Date.parse(goal.end_date)
          ).getFullYear()} `}
        </p>
        <p>
          {goal.status === "success" ? "Կարդացած" : "Ընդհանուր"} գրքերի քանակը -{" "}
          {goal.total_books_number}
        </p>
        {goal.status === "failure" && (
          <p>Կարդացած գրքերի քանակը - {goal.read_books_number}</p>
        )}
        {goal.status === "inprogress" && (
          <p>Կարդացած գրքերի քանակը - {goal.current_read_books_number}</p>
        )}
      </div>
    </div>
  );
}
