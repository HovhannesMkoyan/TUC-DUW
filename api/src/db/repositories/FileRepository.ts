import { QueryTypes } from "sequelize";
import { IFile } from "../../../types";

export default class FileRepository {
  private db: any;
  private logger: any;

  constructor({ db, logger }: { db: any; logger: any }) {
    this.db = db;
    this.logger = logger;
  }

  get(uuid: string) {
    this.logger.info(`DB :: File :: get :: ${uuid}`);

    return this.db.models.File.findOne({ where: { uuid } })
      .then((book: any) => book)
      .catch((error: any) => console.error("Error: ", error));
  }

  add(file: IFile) {
    this.logger.info(`DB :: Files :: Add`);

    return this.db.models.File.create(file).catch(
      (error: string | undefined) => {
        throw new Error(error);
      }
    );
  }
}
