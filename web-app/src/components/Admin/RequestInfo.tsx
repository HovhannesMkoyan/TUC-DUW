import { Badge } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

import { IRequest } from "../../types";

export default function RequestInfo({ request }: { request: IRequest }) {
  return (
    <div>
      <Link to={`/file/${request?.FileId}`} target="_blank">
        {request?.FileName}
      </Link>
      <Badge size="lg" radius="sm" variant="filled">
                  {request?.status === "PENDING"
                    ? request?.action
                    : `${request?.action}ED`}
                </Badge>
      <div className="modal-link_container request-actions-container">
        <button onClick={() => (document.location.href = "/")}>Accept</button>
        <button>Reject</button>
      </div>
    </div>
  );
}
