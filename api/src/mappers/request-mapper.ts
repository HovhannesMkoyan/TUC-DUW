import { IRequest } from "../../types";

export default {
  toDatabase(requestObject: IRequest) {
    return {
      action: requestObject.action,
      reason: requestObject.reason,
      FileId: requestObject.FileId,
    };
  },

  toEntity(databaseObject: IRequest) {
    return {
      uuid: databaseObject.uuid,
      action: databaseObject.action,
      reason: databaseObject.reason,
      status: databaseObject.status,
      FileId: databaseObject.File.uuid,
      FileName: databaseObject.File.name,
      createdAt: databaseObject.createdAt,
    };
  },
};
