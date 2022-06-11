import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { Badge } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCircleXmark,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

import { getUserGoals } from "../../../services/user.service";
import { fetchUserGoalsKey } from "../../../utils/queryKeys";
import NewGoal from "./NewGoal";
import GoalInfo from "./GoalInfo";
import OvalLoader from "../../HelperComponents/OvalLoader/OvalLoader";
import Modal from "../../HelperComponents/Modal/Modal";
import Tooltip from "../../HelperComponents/Tooltip/Tooltip";
import Skeleton from "../../HelperComponents/Skeleton/Skeleton";
import { StateContext } from "../../../Context";
import i18n from "../../../i18n";
import "./Goals.css";

export default function Goals(): JSX.Element {
  const { state } = useContext(StateContext);
  const user = state.auth.user;
  const [subscriptionRequiredModalOpen, setSubscriptionRequiredModalOpen] =
    useState<boolean>(false);

  const [newGoalModalOpen, setNewGoalModalOpen] = useState<boolean>(false);
  const [goalInfonOpen, setGoalInfonOpen] = useState<boolean>(false);
  const [infoGoal, setInfoGoal] = useState<any>();

  const { isLoading, data: goals } = useQuery(
    fetchUserGoalsKey,
    () => getUserGoals(),
    {
      onSuccess: (data) => {
        return data.sort((a: any, b: any) =>
          a.created_at < b.created_at ? 1 : -1
        );
      },
    }
  );

  return (
    <section className="eb-main_container">
      <main className="eb-profile-main">
        <h1
          style={{
            marginBottom: "50px",
            paddingBottom: "10px",
            borderBottom: "1px solid #d3d3d35c",
          }}
        >
          Նպատակներ
          <Badge
            size="xl"
            style={{ marginLeft: "10px", transform: "translateY(-2px)" }}
            color="eb-main-color"
          >
            <span style={{ color: "white" }}>{goals?.length}</span>
          </Badge>
        </h1>
        {isLoading ? (
          <Skeleton type="user-books-page-single-book" />
        ) : (
          <>
            {goals?.length === 0 ? (
              <p>Դուք չունեք սահմանված նպատակներ</p>
            ) : (
              <div>
                {goals?.map((goal: any, index: any) => (
                  <div
                    key={index}
                    className="single-goal_container df df-ac"
                    onClick={() => {
                      setGoalInfonOpen(true);
                      setInfoGoal(goal);
                    }}
                  >
                    <p className="single-goal-title">{goal.title}</p>
                    <Tooltip text="Նպատակում ընդգրկված գրքերի քանակը">
                      <p style={{ width: "30px", textAlign: "center" }}>
                        {goal.total_books_number}
                      </p>
                    </Tooltip>
                    <Tooltip text="Կարդացած գրքերի քանակը">
                      <p style={{ width: "30px", textAlign: "center" }}>
                        {goal.status === "success" && goal.total_books_number}
                        {goal.status === "inprogress" &&
                          goal.current_read_books_number}
                        {goal.status === "failure" && goal.read_books_number}
                      </p>
                    </Tooltip>
                    {goal.status === "inprogress" && (
                      <Tooltip text="Ընթացքում է">
                        <OvalLoader size="sm" />
                      </Tooltip>
                    )}
                    {goal.status === "success" && (
                      <Tooltip text="Հաջողությամբ կատարված է">
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          className="eb-goal-status-icon"
                          style={{ color: "var(--main-eb-color)" }}
                        />
                      </Tooltip>
                    )}
                    {goal.status === "failure" && (
                      <Tooltip text="Նպատակը չի հաջողվել">
                        <FontAwesomeIcon
                          icon={faCircleXmark}
                          className="eb-goal-status-icon"
                          style={{ color: "#d75f5f" }}
                        />
                      </Tooltip>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="eb-goal-add-icon_container">
              <FontAwesomeIcon
                icon={faPlus}
                className="sub-info-icon"
                onClick={() => {
                  if (!user.is_subscribed) {
                    return setSubscriptionRequiredModalOpen(true);
                  }
                  return setNewGoalModalOpen(true);
                }}
              />
            </div>
          </>
        )}
      </main>

      <Modal
        onclose={() => setSubscriptionRequiredModalOpen(false)}
        isOpen={subscriptionRequiredModalOpen}
      >
        <p>Նպատակներ սահմանելու համար անհրաժեշտ է ունենալ բաժանորդագրություն</p>
        <div className="eb-modal-link_container">
          <Link to="/subscription">
            {i18n.am.SINGLE_BOOK_PAGE.MODAL_SUBSCRIPTION_REQUIRED_TEXT_BTN}
          </Link>
        </div>
      </Modal>

      <Modal
        onclose={() => setNewGoalModalOpen(false)}
        isOpen={newGoalModalOpen}
        size="md"
      >
        <NewGoal closeModal={() => setNewGoalModalOpen(false)} />
      </Modal>

      <Modal
        onclose={() => setGoalInfonOpen(false)}
        isOpen={goalInfonOpen}
        size="md"
      >
        <GoalInfo goal={infoGoal} />
      </Modal>
    </section>
  );
}
