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
    return {
      uuid: databaseObject.uuid,
      name: databaseObject.name,
      description: databaseObject.description,
      size: parseInt(databaseObject.size as string),
      reported: getReportedValue(databaseObject.Requests),
      reportType: getReportType(databaseObject.Requests),
      blocked: false,
      createdAt: databaseObject.createdAt,
    };
  },
};

function getReportedValue(requests: IRequest[]) {
  if (requests) {
    return requests.length !== 0 ? true : false;
  }

  return false;
}

function getReportType(requests: IRequest[]) {
  if (requests && requests.length !== 0) {
    return requests[0].action === "BLOCK" ? "BLOCK" : "UNBLOCK";
  }

  return null;
}
