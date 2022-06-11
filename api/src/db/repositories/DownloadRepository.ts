import { QueryTypes } from "sequelize";

export default class DownloadRepository {
  private db: any;
  private logger: any;

  constructor({ db, logger }: { db: any; logger: any }) {
    this.db = db;
    this.logger = logger;
  }

  get(obj: any) {
    this.logger.info(`DB :: Download :: get :: ${obj}`);

    return this.db.models.Download.findOne({ where: obj })
      .then((book: any) => book)
      .catch((error: any) => console.error("Error: ", error));
  }

  create(obj: any) {
    this.logger.info(`DB :: Download :: create`, obj);

    return this.db.models.Download.findOrCreate({ where: obj }).catch(
      (error: any) => {
        console.error(error);
      }
    );
  }
}
