import { useQuery } from "react-query";
import { Tabs } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faHourglass } from "@fortawesome/free-solid-svg-icons";

import { getAll } from "../../services/request.service";
import { fetchRequestsKey } from "../../utils/queryKeys";
import { IRequest } from "../../types";
import RequestsTable from "./RequestsTable";
import InPageLoader from "../Helpers/in-page-loader/InPageLoader";
import Modal from "../Helpers/Modal/Modal";
import "./Admin.css";

export default function Admin() {
  const {
    isLoading,
    isError,
    isSuccess,
    data: requests,
  } = useQuery<IRequest[]>([fetchRequestsKey], () => getAll());

  return (
    <section className="main-container admin-container">
      {isLoading && <InPageLoader />}
      {isError && (
        <Modal isOpen={true} showClosetBtn={false} size="md">
          <p className="ta-center">Error occurred. Please refresh the page.</p>
          <div className="modal-link_container">
            <button onClick={() => (document.location.href = "/")}>
              Home page
            </button>
          </div>
        </Modal>
      )}
      {isSuccess && (
        <Tabs tabPadding="xl" grow>
          <Tabs.Tab
            label="Pending requests"
            icon={<FontAwesomeIcon icon={faHourglass} size="lg" />}
          >
            <RequestsTable requests={requests} tabType="pending" />
          </Tabs.Tab>
          <Tabs.Tab
            label="Resolved requests"
            icon={<FontAwesomeIcon icon={faCircleCheck} size="lg" />}
          >
            <RequestsTable requests={requests} tabType="resolved" />
          </Tabs.Tab>
        </Tabs>
      )}
    </section>
  );
}
