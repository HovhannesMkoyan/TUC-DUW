import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { Badge } from "@mantine/core";

import { update } from "../../services/request.service";
import { IRequest, RequestStatusType } from "../../types";
import { updateRequestKey } from "../../utils/queryKeys";

export default function RequestInfo({ request }: { request: IRequest }) {
  const mutation = useMutation(
    (updatedRequest: Partial<IRequest>) => update(updatedRequest),
    {
      onError: (error, variables, context) => {
        // An error happened!
        console.log(`rolling back optimistic update with id`);
      },
      onSuccess: (data, variables, context) => {
        // queryClient.invalidateQueries([fetchFileKey, uuid]);
        // setRequestModalOpen(false);
        // setRequestReason("");
        // setRequestReasonError("");
      },
    }
  );

  const updateRequest = async (status: RequestStatusType) => {
    const requestObj: Partial<IRequest> = {
      uuid: request.uuid,
      status,
    };

    return mutation.mutate(requestObj);
  };
  
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
        <button onClick={() => updateRequest("ACCEPTED")}>Accept</button>
        <button onClick={() => updateRequest("DECLINED")}>Reject</button>
      </div>
    </div>
  );
}
