import { IFile, IRequest } from "../../types";

export default {
  toDatabase(requestObject: IFile) {
    return {
      name: requestObject.name,
      description: requestObject.description || null,
      size: requestObject.size.toString(),
      data: requestObject.data,
      hash: requestObject.hash,
    };
  },

  toEntity(databaseObject: IFile) {
    const reported = getReportedValue(databaseObject.Requests);
    let reportType = null;
    if (reported) {
      reportType = getReportType(databaseObject.Requests);
    }

    return {
      uuid: databaseObject.uuid,
      name: databaseObject.name,
      description: databaseObject.description,
      size: parseInt(databaseObject.size as string),
      reported,
      reportType,
      blocked: false,
      createdAt: databaseObject.createdAt,
    };
  },
};

function getReportedValue(requests: IRequest[]) {
  let reported = false;

  if (requests && requests.length !== 0) {
    for (const request of requests) {
      if (request.status === "PENDING") {
        reported = true;
      }
    }
  }

  return reported;
}

function getReportType(requests: IRequest[]) {
  if (requests && requests.length !== 0) {
    return requests[0].action === "BLOCK" ? "BLOCK" : "UNBLOCK";
  }

  return null;
}
