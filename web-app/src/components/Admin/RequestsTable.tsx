import React from "react";
import { IRequest } from "../../types";
import FileIcon from "../Helpers/FileIcon/FileIcon";

export default function RequestsTable({
  requests,
  tabType,
}: {
  requests: IRequest[];
  tabType: "resolved" | "pending";
}): JSX.Element {
  let adjustedRequests = requests;
  if (tabType === "pending") {
    adjustedRequests = requests.filter(request => request.status === "PENDING")
  } else if (tabType === "resolved") {
    adjustedRequests = requests.filter(request => request.status !== "PENDING")
  }

  return (
    <div className="requests-container">
      {adjustedRequests.map((request: any, index: any) => (
        <div key={index} className="request-container df df-ac">
          <div className="df df-ac">
          <FileIcon filename={request.FileName} />
          <p>{request.FileName}</p>
          </div>
           
        </div>
      ))}
    </div>
  );
}
