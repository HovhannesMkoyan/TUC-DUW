export default {
  toDatabase(requestObject: any) {
    return {};
  },

  toEntity(databaseObject: any) {
    return {
      uuid: databaseObject.uuid,
      title: databaseObject.title,
      description: databaseObject.description,
      author: databaseObject.author,
      language: databaseObject.language,
      date: databaseObject.date,
      cover: databaseObject.cover,
      pn: databaseObject.pages_number,
      rt: databaseObject.reading_time,
      dn: databaseObject.downloads_number || 535,
    };
  },

  toEntityAdjustedForSearch(databaseObject: any) {
    return {
      uuid: databaseObject.uuid,
      title: databaseObject.title,
      author: databaseObject.author,
      cover: databaseObject.cover, // needed in search results, to show the cover of books
    };
  },

  toEntityAdjustedUserBooks(joinedDatabaseObject: any) {
    return {
      uuid: joinedDatabaseObject.Book.uuid,
      title: joinedDatabaseObject.Book.title,
      cover: joinedDatabaseObject.Book.cover,
      updated_at: joinedDatabaseObject.updatedAt.getTime() / 1000,
    };
  },
};
