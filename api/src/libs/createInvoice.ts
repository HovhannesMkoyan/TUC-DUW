import path from "path";
import PDFDocument from "pdfkit";

export default function createInvoice(
  invoice: any,
  subscriptionType: "monthly" | "yearly"
) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });
  doc.font(path.join(__dirname, "../static/fonts/arnamu.ttf"));

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice, subscriptionType);
  generateFooter(doc);
  doc.end();

  return doc;
}

async function generateHeader(doc: any) {
  doc
    .image(path.join(__dirname, "../static/gow.png"), 50, 45, { width: 150 })
    .fillColor("#444444")
    .fontSize(10)
    .text("Ebooks.am", 200, 75, { align: "right" })
    .text("info@ebooks.am", 200, 90, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc: any, invoice: any) {
  doc.fillColor("#444444").fontSize(17).text("Հաշիվ ապրանքագիր", 50, 200);

  generateHr(doc, 225);

  const customerInformationTop = 240;

  doc
    .fontSize(10)
    .text("Հաշիվ ապրանքագիր #:", 50, customerInformationTop)
    .text(invoice.invoice_nr, 220, customerInformationTop)
    .text("Հաշիվ ապրանքագրի ամսաթիվ:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 220, customerInformationTop + 15)
    .text("Գումար:", 50, customerInformationTop + 30)
    .text(formatCurrency(invoice.subtotal), 220, customerInformationTop + 30)

    .text(invoice.shipping.name, 300, customerInformationTop, {
      align: "right",
    })
    .text(invoice.shipping.email, 300, customerInformationTop + 15, {
      align: "right",
    })
    .moveDown();

  generateHr(doc, 292);
}

function generateInvoiceTable(
  doc: any,
  invoice: any,
  subscriptionType: "monthly" | "yearly"
) {
  let i;
  const invoiceTableTop = 350;

  doc
    .fontSize(10)
    .text("Ապրանք", 50, invoiceTableTop)
    .text("Նկարագրություն", 220, invoiceTableTop)
    .text("Արժեք", 390, invoiceTableTop, { width: 90, align: "right" });
  generateHr(doc, invoiceTableTop + 20);

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;

    doc
      .fontSize(10)
      .text("Ebooks.am", 50, position)
      .moveDown()
      .text("Բաժանորդագրություն", 50, position + 15)
      .text(
        `${
          subscriptionType === "monthly" ? "Ամսական" : "Տարեկան"
        } բաժանորդագրություն`,
        220,
        position
      )
      //.moveDown()
      //.text("ebooks.am կայքին", 220, position + 15)
      .text(item.amount, 390, position, { width: 90, align: "right" });

    generateHr(doc, position + 40);
  }

  const subtotalPosition = invoiceTableTop + 120;
  doc
    .fontSize(10)
    .text("", 50, subtotalPosition)
    .text("Ընդհանուր:", 220, subtotalPosition, { width: 180, align: "right" })
    .text(formatCurrency(invoice.subtotal), 390, subtotalPosition, {
      width: 90,
      align: "right",
    });

  const paidToDatePosition = subtotalPosition + 20;
  doc
    .fontSize(10)
    .text("", 50, paidToDatePosition)
    .text("Վճարված է:", 220, paidToDatePosition, { width: 180, align: "right" })
    .text(formatCurrency(invoice.paid), 390, paidToDatePosition, {
      width: 90,
      align: "right",
    });

  const duePosition = paidToDatePosition + 20;
  doc
    .fontSize(10)
    .text("", 50, duePosition)
    .text("Մնացորդ:", 220, duePosition, { width: 180, align: "right" })
    .text(formatCurrency(invoice.subtotal - invoice.paid), 390, duePosition, {
      width: 90,
      align: "right",
    });
}

function generateFooter(doc: any) {
  doc.fontSize(12).text("Շնորհակալություն բաժանորդագրության համար", 50, 770, {
    align: "center",
    width: 500,
  });
}

function generateHr(doc: any, y: any) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(cents: any) {
  return (cents / 100).toFixed(2) + "֏";
}

function formatDate(date: any) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}
