import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@mantine/core";

import FileIcon from "../Helpers/FileIcon/FileIcon";
import Modal from "../Helpers/Modal/Modal";
import RequestInfo from "./RequestInfo";
import getAdjustedFilename from "../../helpers/get-adjusted-filename";
import { IRequest } from "../../types";
import formatDate from "../../helpers/format-date";

export default function RequestsTable({
  requests,
  tabType,
}: {
  requests: IRequest[];
  tabType: "resolved" | "pending";
}): JSX.Element {
  const [requestInfoModalOpen, setRequestInfoModalOpen] =
    useState<boolean>(false);
  const [requestInfo, setRequestInfo] = useState<IRequest>();

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
    <>
      <div className="requests-container">
        {adjustedRequests.length === 0 ? (
          <p className="ta-center">{`There are no ${
            tabType === "pending" ? "pending" : "resolved"
          } requests`}</p>
        ) : (
          <>
            {adjustedRequests.map((request: IRequest, index: any) => (
              <div
                key={index}
                className="request-container df df-ac"
                onClick={() => {
                  setRequestInfoModalOpen(true);
                  setRequestInfo(request);
                }}
              >
                <div className="df df-ac df-fs" style={{ width: "500px" }}>
                  <FileIcon filename={request.FileName} />
                  {/* {request.status !== "PENDING" ? (
                    <Link to={`/file/${request?.FileId}`}>
                      {request.FileName}
                    </Link>
                  ) : (
                    <p>{request.FileName}</p>
                  )} */}
                  <p>{request.FileName}</p>
                </div>
                <p>{formatDate(new Date(request.createdAt))}</p>
                <Badge size="lg" radius="sm" variant="filled">
                  {request.status === "PENDING"
                    ? request.action
                    : `${request.action}ED`}
                </Badge>
              </div>
            ))}
          </>
        )}
      </div>

      <Modal
        onclose={() => setRequestInfoModalOpen(false)}
        isOpen={requestInfoModalOpen}
        size="lg"
      >
        <RequestInfo request={requestInfo!} />
      </Modal>
    </>
  );
}
