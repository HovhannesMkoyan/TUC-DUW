import React from "react";
import { Tabs } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faHourglass,
  faArrowRightArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import "./Admin.css";

export default function Admin() {
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
