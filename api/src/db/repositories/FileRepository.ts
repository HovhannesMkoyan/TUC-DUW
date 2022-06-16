import { QueryTypes } from "sequelize";

export default class FileRepository {
  private db: any;
  private logger: any;

  constructor({ db, logger }: { db: any; logger: any }) {
    this.db = db;
    this.logger = logger;
  }

  getOneById(id: string | number) {
    this.logger.info(`DB :: Book :: getOneById :: ${id}`);

    return this.db.models.Book.findOne({ where: { id, visible: 1 } })
      .then((book: any) => book)
      .catch((error: any) => console.error("Error: ", error));
  }

  getOne(uuid: string) {
    this.logger.info(`DB :: Book :: getOne :: ${uuid}`);

    return this.db.models.Book.findOne({ where: { uuid, visible: 1 } })
      .then((book: any) => book)
      .catch((error: any) => console.error("Error: ", error));
  }

  getAll() {
    this.logger.info(`DB :: Books :: getAll`);

    return this.db.models.Book.findAll({
      where: {
        visible: 1,
      },
      order: [["created_at", "DESC"]],
    })
      .then((books: any) => books)
      .catch((error: any) => console.error(error));
  }

  getAllDownloadsNumber() {
    this.logger.info(`DB :: Books :: getAllDownloadsNumber`);

    return this.db
      .query("SELECT SUM(downloads_number) as downloads_number FROM books", {
        type: QueryTypes.SELECT,
      })
      .catch((error: any) => console.error(error));
  }

  async getBooksWithGivenTags(tags: string[]) {
    this.logger.info(`DB :: Books :: getWithTag (${tags})`);

    const wantedTags: any[] = await this.db.models.Tag.findAll({
      where: { tag_slug: tags },
    });
    const wantedBookIds = wantedTags.map((tag: any) => tag.BookId);

    return this.db.models.Book.findAll({
      where: { id: wantedBookIds, visible: 1 },
      order: [["created_at", "DESC"]],
    }).catch((error: any) => console.error("Error: ", error));
  }

  getBySearch(query: string) {
    this.logger.info(`DB :: Books :: getBySearch`, query);

    return this.db
      .query(
        "SELECT * FROM books WHERE visible = 1 AND title LIKE :search_name OR author LIKE :search_name",
        {
          replacements: { search_name: `%${query}%` },
          type: QueryTypes.SELECT,
        }
      )
      .then((books: any) => books)
      .catch((error: any) => console.error(error));
  }

  async getMostDownloaded() {
    this.logger.info(`DB :: Books :: getMostDownloaded`);

    return this.db
      .query(
        "SELECT * FROM books WHERE visible = 1 ORDER BY downloads_number DESC LIMIT 6",
        {
          type: QueryTypes.SELECT,
        }
      )
      .then((books: any) => books)
      .catch((error: any) => console.error(error));
  }

  getUserBooksByType(
    activityType: "inprogress" | "bookmarks" | "completed" | "downloads",
    userId: number
  ) {
    this.logger.info(`DB :: Books :: getUserBooksByType`);

    let modelName: "UserBookActivity" | "Download" = "UserBookActivity";
    if (activityType === "downloads") {
      modelName = "Download";
    }

    let whereClause: any = {
      user_id: userId,
    };
    if (activityType !== "downloads") {
      whereClause.status = activityType;
    }

    return this.db.models[modelName]
      .findAll({
        where: whereClause,
        include: {
          model: this.db.models.Book,
        },
        order: [["created_at", "DESC"]],
      })
      .then((books: any) => books)
      .catch((error: any) => console.error(error));
  }

  // async updateReadingTime() {
  //   const books = await this.db.models.Book.findAll().catch((error: any) =>
  //     console.error("Error: ", error)
  //   );

  //   books.slice(1050,1150).forEach(async (book: any) => {
  //     await book.update({
  //       reading_time: +((500 * book.pages_number) / 300 / 60).toFixed(2),
  //     });
  //   });
  // }

  // updateBookImageFilename(book: any, newName: string) {
  //   return this.db.models.Book.findOne({ where: { uuid: book.uuid } })
  //     .then((book: any) => {
  //       book.filename = newName;
  //       return book.save();
  //     })
  //     .catch((error: any) => console.error("Error: ", error));
  // }

  // updateBookCover(book: any, newCoverName: string) {
  //   return this.db.models.Book.findOne({ where: { uuid: book.uuid } })
  //     .then((book: any) => {
  //       book.cover = newCoverName;
  //       return book.save();
  //     })
  //     .catch((error: any) => console.error("Error: ", error));
  // }
}
