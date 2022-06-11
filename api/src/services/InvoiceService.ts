import fs from "fs";
import path from "path";

import { IInvoice, IUser } from "../../types";
import createInvoice from "../libs/createInvoice";

export default class InvoiceService {
  private invoiceMapper: any;
  private invoiceRepository: any;

  constructor({
    invoiceMapper,
    invoiceRepository,
  }: {
    invoiceMapper: any;
    invoiceRepository: any;
  }) {
    this.invoiceMapper = invoiceMapper;
    this.invoiceRepository = invoiceRepository;
  }

  async getAll(user: IUser) {
    const invoices = await this.invoiceRepository.getAll(user.id);

    return invoices.map((invoice: IInvoice) =>
      this.invoiceMapper.toEntity(invoice)
    );
  }

  async get(invoiceId: string) {
    const invoice = await this.invoiceRepository.get(invoiceId);
    return this.invoiceMapper.toEntity(invoice);
  }

  async create(
    user: any,
    subscription: any,
    invoiceNumber: string,
    invoiceURL: string,
    amountPaid: number
  ) {
    await this.generatePDF(user, subscription.subscription_type, invoiceNumber);

    // Create invoice DB Object
    const invoiceDBObject = await this.invoiceMapper.toDatabase({
      user_id: user.id,
      subscription_id: subscription.id,
      filename: `${invoiceNumber}.pdf`,
      hosted_invoice_url: invoiceURL,
      amount_paid: amountPaid,
    });

    const invoice = await this.invoiceRepository.create(invoiceDBObject);
    return this.invoiceMapper.toEntity(invoice);
  }

  private async generatePDF(
    user: any,
    subscriptionType: "monthly" | "yearly",
    invoiceNumber: string
  ) {
    let price: any =
      subscriptionType === "monthly"
        ? process.env.SUBSCRIPTION_MONTHLY_PRICE
        : process.env.SUBSCRIPTION_YEARLY_PRICE;
    price = Number(price);

    const invoice = {
      shipping: {
        name: `${user.firstname} ${user.lastname}`,
        email: user.email,
      },
      items: [
        {
          item: "Բաժանորդագրություն",
          description: `${
            subscriptionType === "monthly" ? "Ամսական" : "Տարեկան"
          } բաժանորդագրություն<br>Ebooks.am կայքին`,
          quantity: 1,
          amount: price,
        },
      ],
      subtotal: price * 100,
      paid: price * 100,
      invoice_nr: invoiceNumber,
    };

    try {
      const invoicePDF = await createInvoice(invoice, subscriptionType);

      await invoicePDF
        .pipe(
          fs.createWriteStream(
            path.resolve(
              __dirname,
              "../../../api",
              `files/invoices/${invoiceNumber}.pdf`
            )
          )
        )
        .on("finish", function () {
          console.log("PDF generated and uploaded th files folder");
        });
    } catch (error) {}
  }
}
