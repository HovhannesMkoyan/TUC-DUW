import { IFile } from "../../types";

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

  toEntity(databaseObject: Partial<IFile>) {
    return {
      uuid: databaseObject.uuid,
      name: databaseObject.name,
      description: databaseObject.description,
      size: parseInt(databaseObject.size as string),
      blocked: databaseObject.blocked,
      createdAt: databaseObject.createdAt,
    };
  },
};
