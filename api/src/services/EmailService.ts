import nodemailer from "nodemailer";
import { IServices } from "../../types";

// const transporter = nodemailer.createTransport({
//   host: "smtp.zoho.com",
//   secure: true,
//   port: 465,
//   auth: {
//     user: "admin@ebooks.am",
//     pass: "122334joh_N",
//   },
// });

var transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b8822721baaad4",
    pass: "2380c2e6403587",
  },
});

export default class MailService {
  private invoiceService: any;

  constructor({ invoiceService }: IServices) {
    this.invoiceService = invoiceService;
  }

  async sendFirstPaymentInvoice(user: any, invoiceNumber: string) {
    const pdfInvoice = await this.invoiceService.create(user, invoiceNumber);

    return transporter.sendMail({
      from: "admin@ebooks.am",
      to: user.email,
      subject: "Ebooks.am - Վճարման ստացական",
      html: `<p>Հարգելի ${user.firstname} ${user.lastname},<br>Շնորհակալություն ebooks.am-ում բաժանորդագրություն ստեղծելու համար։<br>Կցված կարող եք գտնել Ձեր վճարման ստացականը</p>`,
      attachments: [
        {
          filename: `Ebooks.am - Հաշիվ ապրանքագիր ${new Date()
            .toISOString()
            .slice(0, 10)}.pdf`,
          content: pdfInvoice,
          contentType: "application/pdf",
        },
      ],
    });
  }
}
