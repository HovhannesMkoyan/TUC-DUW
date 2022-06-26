import { useQuery } from "react-query";
import { Tabs } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faHourglass,
  faArrowRightArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import { getAll } from "../../services/request.service";
import { fetchRequestsKey } from "../../utils/queryKeys";
import { IRequest } from "../../types";
import "./Admin.css";

export default function Admin() {
    const {
        isLoading,
        isError,
        isSuccess,
        data: file,
      } = useQuery<IRequest>([fetchRequestsKey], () => getAll());

  return (
    <section className="main-container">
      <Tabs tabPadding="xl" grow>
        <Tabs.Tab
          label="Pending requests"
          icon={<FontAwesomeIcon icon={faHourglass} size="lg" />}
        >
          Pending requests
        </Tabs.Tab>
        <Tabs.Tab
          label="Resolved requests"
          icon={<FontAwesomeIcon icon={faCircleCheck} size="lg" />}
        >
          Resolved requests
        </Tabs.Tab>
        <Tabs.Tab
          label="All requests"
          icon={<FontAwesomeIcon icon={faArrowRightArrowLeft} size="lg" />}
        >
          All requests
        </Tabs.Tab>
      </Tabs>
    </section>
  );
}
