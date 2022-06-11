import React from "react";
import { Accordion } from "@mantine/core";

import data from "./questions-answers";
import { Mixpanel } from "../../libs/mixpanel";
import "./FAQ.css";

export default function FAQ(): JSX.Element {
  React.useEffect(() => {
    if (!localStorage.getItem("ap_ci")) {
      localStorage.setItem("ap_ci", "true");
    }
  }, []);

  const items = data.map((item) => (
    <Accordion.Item label={item.title} key={item.title}>
      <p>{item.content}</p>
    </Accordion.Item>
  ));

  Mixpanel.track("FAQ Page");
  return (
    <section className="eb-main_container">
      <main className="eb-faq_container">
        <Accordion>{items}</Accordion>
      </main>
    </section>
  );
}
