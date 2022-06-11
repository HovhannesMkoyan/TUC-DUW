import fs from "fs";
import path from "path";
import { PDFDocument } from "pdf-lib";
export default class PdfService {
  private bookRepository: any;

  constructor({ bookRepository }: { bookRepository: any }) {
    this.bookRepository = bookRepository;
  }

  async fetchBookStream(book_id: string, user: any) {
    const book = await this.bookRepository.getOne(book_id);
    const directory = path.join(__dirname, "../../", "files/bf");

    let dataBuffer = fs.readFileSync(`${directory}/${book.filename}`);
    if (user.is_subscribed) {
      return dataBuffer;
    } else {
      const bookPdf = await PDFDocument.load(dataBuffer);
      const returnPdf = await PDFDocument.create();

      // Copy 1-2 pages of the book & add them to a new PDF
      const copiedPages = await returnPdf.copyPages(bookPdf, [0, 1, 2]);
      const [firstPage, secondPage] = copiedPages;
      returnPdf.addPage(firstPage);
      returnPdf.addPage(secondPage);

      const pdfBytes = await returnPdf.saveAsBase64();
      return Buffer.from(pdfBytes, "base64");
    }
  }

  async getPagesNumberFor(book: any) {
    const directory = path.join(__dirname, "../../", "files/bf");
    let dataBuffer = fs.readFileSync(`${directory}/${book.filename}`);

    const pdfDoc = await PDFDocument.load(dataBuffer);
    return pdfDoc.getPageCount();
  }

  calculateReadingTime(pagesNumber: number) {
    // Making the calculation based on pages number but not on words number,
    // as there are pdf files which pages are images and the words can't be counted
    const wordsPerPage = 235;
    const averageWPM = 220;

    const totalWordCount = wordsPerPage * pagesNumber;
    const readingTime = totalWordCount / averageWPM / 60; // in hours

    return Math.ceil(readingTime);
  }
}
