import { IUser } from "../../types";

export default {
  toDatabase(requestObject: IUser) {
    return {
      firstname: requestObject.firstname || null,
      lastname: requestObject.lastname || null,
      email: requestObject.email,
      city: requestObject.detailed_geo_info.city || null,
      country: requestObject.detailed_geo_info.country || null,
      detailed_geo_info:
        JSON.stringify(requestObject.detailed_geo_info) || null,
      provider: requestObject.provider,
      provider_id: requestObject.provider_id,
    };
  },

  toEntity(databaseObject: Partial<IUser>) {
    return {
      uuid: databaseObject.uuid,
      firstname: databaseObject.firstname || null,
      lastname: databaseObject.lastname || null,
      email: databaseObject.email,
      provider: databaseObject.provider,
      dl: databaseObject.downloads_left,
      is_subscribed: databaseObject.is_subscribed,
    };
  },
};
