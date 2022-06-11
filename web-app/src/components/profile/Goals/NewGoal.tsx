import { useState } from "react";
import { useQueryClient } from "react-query";
import { DateRangePicker } from "@mantine/dates";
import { TextInput } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import "dayjs/locale/hy-am";

import { addNewUserGoal } from "../../../services/user.service";
import { fetchUserGoalsKey } from "../../../utils/queryKeys";
import Tooltip from "../../HelperComponents/Tooltip/Tooltip";
import "dayjs/locale/hy-am";

export default function NewGoal(props: any) {
  const queryClient = useQueryClient();

  const [newGoalDateValue, setNewGoalDateValue] = useState<
    [Date | null, Date | null]
  >([null, null]);
  const [newGoalBooksNumber, setNewGoalBooksNumber] = useState<string>();
  const [newGoalTitle, setNewGoalTitle] = useState<string>("");

  const start = dayjs(newGoalDateValue[0]);
  const end = dayjs(newGoalDateValue[1]);

  const addNewGoal = async () => {
    const startDate = dayjs(start).format("YYYY-MM-DD");
    const endDate = dayjs(end).format("YYYY-MM-DD");

    if (startDate && endDate && newGoalBooksNumber && newGoalTitle) {
      await addNewUserGoal(
        startDate,
        endDate,
        newGoalBooksNumber!,
        newGoalTitle
      );
      queryClient.invalidateQueries(fetchUserGoalsKey);
      return props.closeModal();
    } else {
      return props.closeModal();
    }
  };

  return (
    <div className="eb-newGoal_container">
      <div>
        <label>
          Ժամանակահատված
          <Tooltip text="Նպատակի իրականացման սկիզբը և վերջը">
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="sub-info-icon"
              style={{ marginLeft: "5px" }}
            />
          </Tooltip>{" "}
          {newGoalDateValue[0] &&
            newGoalDateValue[1] &&
            `(${end.diff(start, "days") + 1} օր)`}
        </label>
        <DateRangePicker
          value={newGoalDateValue}
          onChange={setNewGoalDateValue}
          locale="hy-am"
          radius={3}
          icon={<FontAwesomeIcon icon={faCalendarDays} />}
          size="md"
          minDate={dayjs(new Date()).toDate()}
        />
      </div>
      <div>
        <label>
          Գրքերի քանակ
          <Tooltip text="Գրքերի քանակը, որ ցանկանում եք կարդալ նշված ժամանակահատվածում">
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="sub-info-icon"
              style={{ marginLeft: "5px" }}
            />
          </Tooltip>
        </label>
        <TextInput
          type="number"
          value={newGoalBooksNumber}
          onChange={(event) => {
            let number = parseInt(event.target.value);
            if (number < 1) {
              number = 1;
            } else if (number > 365) {
              number = 365;
            }

            setNewGoalBooksNumber(number.toString());
          }}
          size="md"
          radius={3}
        />
      </div>
      <div>
        <label>
          Անվանում
          <Tooltip text="Նպատակի անվանումը կամ վերնագիրը (տարբերակելու համար)">
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="sub-info-icon"
              style={{ marginLeft: "5px" }}
            />
          </Tooltip>
        </label>
        <TextInput
          value={newGoalTitle}
          onChange={(event) => setNewGoalTitle(event.target.value)}
          size="md"
          radius={3}
          required
        />
      </div>
      {newGoalDateValue[0] &&
        newGoalDateValue[1] &&
        newGoalBooksNumber &&
        newGoalTitle.trim().length > 3 && (
          <button onClick={() => addNewGoal()}>Ավելացնել նպատակը</button>
        )}
    </div>
  );
}
