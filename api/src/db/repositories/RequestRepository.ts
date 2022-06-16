export default class RequestRepository {
  private db: any;
  private logger: any;

  constructor({ db, logger }: { db: any; logger: any }) {
    this.db = db;
    this.logger = logger;
  }

  async getAll(user_id: string) {
    this.logger.info(`DB :: Invoice :: getAll`, user_id);

    return this.db.models.Invoice.findAll({ where: { user_id } })
      .then((invoices: any) => invoices)
      .catch((error: any) => console.error("Error: ", error));
  }

  async get(invoiceId: string) {
    this.logger.info(`DB :: Invoice :: get`, invoiceId);

    return this.db.models.Invoice.findOne({ where: { uuid: invoiceId } })
      .then((invoices: any) => invoices)
      .catch((error: any) => console.error("Error: ", error));
  }

  async create(invoice: any) {
    this.logger.info(`DB :: Invoice :: create`, invoice);

    return this.db.models.Invoice.create(invoice).catch(
      (error: string | undefined) => {
        throw new Error(error);
      }
    );
  }
}
