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
      reported: databaseObject.Requests.length !== 0 ? true : false,
      reportType: getReportType(databaseObject.Requests),
      blocked: false,
      createdAt: databaseObject.createdAt,
    };
  },
};

function getReportType(requests: IRequest[]) {
  if (requests.length !== 0) {
    return requests[0].action === "BLOCK" ? "BLOCK" : "UNBLOCK";
  }

  return null;
}
