export default class DownloadRepository {
  private db: any;
  private logger: any;

  constructor({ db, logger }: { db: any; logger: any }) {
    this.db = db;
    this.logger = logger;
  }

  get(obj: any) {
    this.logger.info(`DB :: UserBookActivity :: get :: ${obj}`);

    return this.db.models.UserBookActivity.findOne({ where: obj })
      .then((book: any) => book)
      .catch((error: any) => console.error("Error: ", error));
  }

  async createOrUpdate(obj: any) {
    this.logger.info(`DB :: UserBookActivity :: createOrUpdate`, obj);

    const activity = await this.get({
      UserId: obj.UserId,
      BookId: obj.BookId,
    });

    // Not using upsert() because the hooks won't work in that case
    if (activity) {
      return this.db.models.UserBookActivity.update(obj, {
        where: {
          id: activity.id,
        },
        individualHooks: true,
      }).catch((error: any) => {
        console.error(error);
      });
    }

    return this.db.models.UserBookActivity.create(obj).catch((error: any) => {
      console.error(error);
    });
  }

  delete(obj: any) {
    this.logger.info(`DB :: UserBookActivity :: delete :: ${obj}`);

    return this.db.models.UserBookActivity.destroy({ where: obj })
      .then((book: any) => book)
      .catch((error: any) => console.error("Error: ", error));
  }
}
