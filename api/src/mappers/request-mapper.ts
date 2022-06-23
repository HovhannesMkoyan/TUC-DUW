import { IRequest } from "../../types";

export default {
  toDatabase(requestObject: IRequest) {
    return {
      type: requestObject.type,
      reason: requestObject.reason,
      status: requestObject.status,
      FileId: requestObject.FileId,
    };
  },

  toEntity(databaseObject: IRequest) {
    return {
      uuid: databaseObject.uuid,
      type: databaseObject.type,
      reason: databaseObject.reason,
      status: databaseObject.status,
      FileId: databaseObject.FileId,
      createdAt: databaseObject.createdAt,
    };
  },
};
