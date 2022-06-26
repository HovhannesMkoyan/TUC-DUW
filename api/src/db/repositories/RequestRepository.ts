import { IRequest } from "../../../types";

export default class RequestRepository {
  private db: any;
  private logger: any;

  constructor({ db, logger }: { db: any; logger: any }) {
    this.db = db;
    this.logger = logger;
  }

  getAll() {
    this.logger.info(`DB :: Request :: getAll`);

    return this.db.models.Request.findAll({
      include: {
        model: this.db.models.File,
      },
    }).catch((error: any) =>
      console.error("Error: ", error)
    );
  }

  get(FileId: string) {
    this.logger.info(`DB :: Request :: get :: ${FileId}`);

    return this.db.models.Request.findOne({ where: { FileId } }).catch(
      (error: any) => console.error("Error: ", error)
    );
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
