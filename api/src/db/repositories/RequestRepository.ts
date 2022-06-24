import { IRequest } from "../../../types";

export default class RequestRepository {
  private db: any;
  private logger: any;

  constructor({ db, logger }: { db: any; logger: any }) {
    this.db = db;
    this.logger = logger;
  }

  get(uuid: string) {
    this.logger.info(`DB :: Request :: get :: ${uuid}`);

    return this.db.models.File.findOne({ where: { uuid } })
      .then((book: any) => book)
      .catch((error: any) => console.error("Error: ", error));
  }

  add(request: IRequest) {
    this.logger.info(`DB :: Request :: Add`);

    return this.db.models.Request.create(request).catch(
      (error: string | undefined) => {
        throw new Error(error);
      }
    );
  }
}
