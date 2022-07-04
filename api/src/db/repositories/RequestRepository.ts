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
    });
  }
  
  getByFileId(FileId: string) {
    this.logger.info(`DB :: Request :: getByFileId :: ${FileId}`);

    return this.db.models.Request.findOne({ where: { FileId } });
  }

  add(request: IRequest) {
    this.logger.info(`DB :: Request :: Add`);

    return this.db.models.Request.create(request);
  }

  update(request: Partial<IRequest>) {
    this.logger.info(`DB :: Request :: Update`);

    return this.db.models.Request.update({ status: request.status }, {
      where: {
        uuid: request.uuid
      }
    })
  }
}
