import { Badge } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

import { IRequest } from "../../types";

export default function RequestInfo({ request }: { request: IRequest }) {
  return (
    <div className="request-modal">
      <Badge size="lg" radius="sm" variant="filled">
        {request?.status === "PENDING"
          ? request?.action
          : `${request?.action}ED`}
      </Badge>
      <Link to={`/file/${request?.FileId}`} target="_blank" className="request-modal-file-title">
        {request?.FileName}
      </Link>
      <p className="ta-center bold">{request?.reason}</p>
      <div className="request-actions-container">
        <button onClick={() => (document.location.href = "/")}>Accept</button>
        <button>Reject</button>
      </div>
    </div>
  );
}
