import React from "react";
import { IRequest } from "../../types";

export default function RequestsTable({
  requests,
  tabType,
}: {
  requests: IRequest[];
  tabType: "all" | "resolved" | "pending";
}): JSX.Element {
  return <div></div>;
}
