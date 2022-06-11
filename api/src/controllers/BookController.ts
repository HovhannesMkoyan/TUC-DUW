import path from "path";
import { Request, Response } from "express";
import { IServices, IMappers } from "../../types";
export default class BookController {
  private userMapper: any;
  private bookService: any;
  private downloadService: any;
  private userService: any;
  private pdfService: any;
  private recommendationService: any;

  constructor({
    userMapper,
    bookService,
    downloadService,
    userService,
    pdfService,
    recommendationService,
  }: IServices & IMappers) {
    this.userMapper = userMapper;
    this.bookService = bookService;
    this.downloadService = downloadService;
    this.userService = userService;
    this.pdfService = pdfService;
    this.recommendationService = recommendationService;
  }

  public getBook = async (req: Request, res: Response) => {
    try {
      const book = await this.bookService.getBook(req.params.book_id);

      return res.status(200).json(book);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "An error occured while processing the request",
      });
    }
  };

  public getBooks = async (req: Request, res: Response) => {
    let { category, adjusted } = req.query;
    let books: any = [];

    try {
      if (category) {
        books = await this.bookService.getBooksWithTag(category);
      } else {
        books = await this.bookService.getAllBooks(adjusted);
      }

      return res.status(200).json(books);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "An error occured while processing the request",
      });
    }
  };

  public getAllDownloadsNumber = async (req: Request, res: Response) => {
    try {
      const downloadsNumber = await this.bookService.getAllDownloadsNumber();
      return res.status(200).json(downloadsNumber);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "An error occured while processing the request",
      });
    }
  };

  public getCategoriesInfo = async (req: Request, res: Response) => {
    try {
      const info = await this.bookService.getCategoriesInfo();
      return res.status(200).json(info);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "An error occured while processing the request",
      });
    }
  };

  public getBooksBySearch = async (req: Request, res: Response) => {
    const { query } = req.query;

    try {
      const books = await this.bookService.getBooksBySearch(query);

      return res.status(200).json(books);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "An error occured while processing the request",
      });
    }
  };

  public getSuggestions = async (req: Request, res: Response) => {
    try {
      const suggestions = await this.recommendationService.get(
        req.params.book_id,
        req.user
      );
      return res.status(200).json(suggestions);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "An error occured while processing the request",
      });
    }
  };

  public downloadBook = async (req: Request, res: Response) => {
    if (req.headers.accept === "application/pdf") {
      const book = await this.bookService.getBookForDownload(
        req.params.book_id
      );

      const alreadyDownloaded = await this.downloadService.get(
        (req.user as any).id,
        book.id
      );

      if ((req.user as any).downloads_left > 0 || alreadyDownloaded) {
        try {
          if (!alreadyDownloaded) {
            await this.downloadService.create((req.user as any).id, book.id);
          }

          return res.download(
            path.resolve(__dirname, "../../../api", `files/bf/${book.filename}`)
          );
        } catch (error) {
          console.log(error);
          return res.status(500).send();
        }
      }

      return res.status(403).json({
        error: "Not allowed to download",
        code: "NO_DOWNLOADS_LEFT",
      });
    }

    return res.status(406).send();
  };

  public readBook = async (req: Request, res: Response) => {
    try {
      const bookBuffer = await this.pdfService.fetchBookStream(
        req.params.book_id,
        req.user
      );

      return res.status(200).send(bookBuffer);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "An error occured while processing the request",
      });
    }
  };

  public getUserBookActivity = async (req: Request, res: Response) => {
    try {
      const activity = await this.bookService.getUserBookActivity(
        req.params.book_id,
        req.user
      );

      return res.status(200).send({ status: activity?.status });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "An error occured while processing the request",
      });
    }
  };

  public updateUserBookActivity = async (req: Request, res: Response) => {
    try {
      await this.bookService.updateUserBookActivity(
        req.params.book_id,
        req.user,
        req.body.status,
        req.body.goal_id
      );

      return res.status(200).send();
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "An error occured while processing the request",
      });
    }
  };

  public deleteUserBookActivity = async (req: Request, res: Response) => {
    try {
      await this.bookService.deleteUserBookActivity(
        req.params.book_id,
        req.user
      );

      return res.status(200).send();
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "An error occured while processing the request",
      });
    }
  };

  // public addComment = async (req: Request, res: Response) => {
  //   try {
  //     await this.bookService.updateUserBookReadStatus(
  //       req.params.book_id,
  //       (req.user as any).uuid
  //     );

  //     return res.status(200).json({
  //       success: true,
  //     });
  //   } catch (err) {
  //     return res.status(500).json({
  //       success: false,
  //       message: "An error occured while processing the request",
  //     });
  //   }
  // };
}
