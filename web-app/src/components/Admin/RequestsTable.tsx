import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@mantine/core";

import { IRequest } from "../../types";
import FileIcon from "../Helpers/FileIcon/FileIcon";
import getAdjustedFilename from "../../helpers/get-adjusted-filename";

export default function RequestsTable({
  requests,
  tabType,
}: {
  requests: IRequest[];
  tabType: "resolved" | "pending";
}): JSX.Element {
  const [first, setfirst] = useState<string>("");

  let adjustedRequests = requests;
  if (tabType === "pending") {
    adjustedRequests = requests.filter(
      (request) => request.status === "PENDING"
    );
  } else if (tabType === "resolved") {
    adjustedRequests = requests.filter(
      (request) => request.status !== "PENDING"
    );
  }

  return (
    <div className="requests-container">
      {adjustedRequests.map((request: IRequest, index: any) => (
        <div
          key={index}
          className="request-container df df-ac"
          onClick={() => {
            // setGoalInfonOpen(true);
            // setInfoGoal(goal);
          }}
        >
          <div className="df df-ac">
            <FileIcon filename={request.FileName} />
            <p>{getAdjustedFilename(request.FileName, 63)}</p>
          </div>
          <Badge size="lg" radius="sm" variant="filled">
            {request.status === "PENDING" ? request.action : `${request.action}ED`}
          </Badge>
        </div>
      ))}
    </div>
  );
}
