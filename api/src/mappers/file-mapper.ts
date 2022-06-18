import { IFile } from "../../types";

export default {
  toDatabase(requestObject: IFile) {
    return {
      name: requestObject.name,
      description: requestObject.description || null,
      size: requestObject.size,
      data: requestObject.size,
      hash: requestObject.size,
    };
  },

  toEntity(databaseObject: Partial<IFile>) {
    return {
      uuid: databaseObject.uuid,
    };
  },
};
