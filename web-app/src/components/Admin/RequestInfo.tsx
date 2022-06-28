import React from "react";
import { Link } from "react-router-dom";

import { IRequest } from "../../types";

export default function RequestInfo({ request }: { request: IRequest }) {
  return (
    <div>
      <Link to={`/file/${request?.FileId}`}>{request?.FileName}</Link>
    </div>
  );
}
