import { IBook, TUserBookActivityStatus } from "../../types";
import categoriesInfoObject from "../helpers/categoriesInfoObject";

export default class BookService {
  private bookMapper: any;
  private bookRepository: any;
  private userBookActivityRepository: any;
  private downloadRepository: any;
  private imageService: any;
  private pdfService: any;

  constructor({
    bookMapper,
    bookRepository,
    userBookActivityRepository,
    downloadRepository,
    imageService,
    pdfService,
  }: {
    bookMapper: any;
    bookRepository: any;
    userBookActivityRepository: any;
    downloadRepository: any;
    imageService: any;
    pdfService: any;
  }) {
    this.bookMapper = bookMapper;
    this.bookRepository = bookRepository;
    this.userBookActivityRepository = userBookActivityRepository;
    this.downloadRepository = downloadRepository;
    this.imageService = imageService;
    this.pdfService = pdfService;
  }

  async getBook(uuid: string) {
    const book = await this.bookRepository.getOne(uuid);
    return this.bookMapper.toEntity(book);
  }

  getBookForDownload(uuid: string) {
    return this.bookRepository.getOne(uuid);
  }

  async getAllBooks(adjusted: boolean) {
    const books = await this.bookRepository.getAll();
    return adjusted
      ? books.map((book: IBook) =>
          this.bookMapper.toEntityAdjustedForSearch(book)
        )
      : books.map((book: IBook) => this.bookMapper.toEntity(book));
  }

  async getAllDownloadsNumber() {
    const result = await this.bookRepository.getAllDownloadsNumber();
    return result[0].downloads_number;
  }

  async getCategoriesInfo() {
    let categories: { [key: string]: string[] } = categoriesInfoObject;
    let returnInfo: any = {};

    for (const categoryKey in categories) {
      if (categoryKey === "latest") {
        let data = await this.bookRepository.getAll();
        returnInfo[categoryKey] = data.length;
      } else {
        let data = await this.bookRepository.getBooksWithGivenTags(
          categories[categoryKey]
        );
        returnInfo[categoryKey] = data.length;
      }
    }

    return returnInfo;
  }

  async getBooksWithTag(tag: string) {
    let categories: { [key: string]: string[] } = categoriesInfoObject;
    let books: any[] = [];

    if (tag === "latest") {
      books = await this.bookRepository.getAll();
    } else if (tag === "most-downloaded") {
      books = await this.bookRepository.getMostDownloaded();
    } else {
      tag = tag.replace(/ /g, "_");
      tag = tag.replace(/-/g, "_");
      books = await this.bookRepository.getBooksWithGivenTags(categories[tag]);
    }

    return books.map((book: IBook) => this.bookMapper.toEntity(book));
  }

  async getBooksBySearch(query: string) {
    const books = await this.bookRepository.getBySearch(query);
    return books.map((book: IBook) =>
      this.bookMapper.toEntityAdjustedForSearch(book)
    );
  }

  async getUserBookActivity(bookUuid: string, user: any) {
    const book = await this.bookRepository.getOne(bookUuid);

    return this.userBookActivityRepository.get({
      UserId: user.id,
      BookId: book.id,
    });
  }

  async updateUserBookActivity(
    bookUuid: string,
    user: any,
    status: TUserBookActivityStatus,
    goalId: number
  ) {
    const book = await this.bookRepository.getOne(bookUuid);

    return this.userBookActivityRepository.createOrUpdate({
      UserId: user.id,
      BookId: book.id,
      status,
      GoalId: goalId || null,
    });
  }

  async deleteUserBookActivity(bookUuid: string, user: any) {
    const book = await this.bookRepository.getOne(bookUuid);

    return this.userBookActivityRepository.delete({
      UserId: user.id,
      BookId: book.id,
    });
  }

  // async populatePagesNumberAndReadingTime() {
  //   const books = await this.bookRepository.getAll();

  //   await Promise.all(books.map(async (book: any) => {
  //     if (!book.pages_number) {
  //       console.log("------0-------", book.uuid)
  //       const pagesNumber = await this.pdfService.getPagesNumberFor(book);
  //       const readingTime = await this.pdfService.calculateReadingTime(pagesNumber);
  //       return this.bookRepository.updateBookPagesNumberAndReadingTime(book, pagesNumber, readingTime);
  //     }
  //   }));
  // }

  // async convertToWebp() {
  //   const books = await this.bookRepository.getAll();
  //   books.forEach(async (book: IBook) => {
  //     console.log(book.uuid);
  //     return this.imageService.convertToWebp(book);
  //   });
  //   return books.map((book: IBook) => this.bookMapper.toEntity(book));
  // }

  // async renameCoverImages() {
  //   const books = await this.bookRepository.getAll();
  //   const directory = path.join(__dirname, "../../", "uploads/bi");

  //   books.forEach(async (book: IBook) => {
  //     let newCoverName = "";
  //     if (fs.existsSync(`${directory}/${book.cover}.jpg`) || fs.existsSync(`${directory}/${book.cover}.jpeg`)) {
  //       newCoverName = `${book.filename.substring(0, book.filename.length - 3)}jpg`;

  //       await this.imageService.renameCoverImage(book, newCoverName);
  //       return this.bookRepository.updateBookCover(book, newCoverName);
  //     }
  //   });

  //   return books.map((book: IBook) => this.bookMapper.toEntity(book));
  // }
}
