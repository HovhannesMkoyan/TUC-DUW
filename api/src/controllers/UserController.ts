import string from "string-sanitizer";
import { Request, Response } from "express";
import { IMappers, IServices, IUser } from "../../types";

export default class UserController {
  private userMapper: any;
  private userService: any;
  private stripeService: any;
  private invoiceService: any;

  constructor({
    userMapper,
    userService,
    stripeService,
    invoiceService,
  }: IServices & IMappers) {
    this.userMapper = userMapper;
    this.userService = userService;
    this.stripeService = stripeService;
    this.invoiceService = invoiceService;
  }

  public getUser = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.getUser(req.user);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).send();
    }
  };

  public getUserBooksByType = async (req: Request, res: Response) => {
    const { type } = req.query;

    if (
      type &&
      (type === "inprogress" ||
        type === "bookmarks" ||
        type === "completed" ||
        type === "downloads")
    ) {
      try {
        const books = await this.userService.getUserBooksByType(req.user, type);

        return res.status(200).json(books);
      } catch (error) {
        return res.status(500).send();
      }
    }

    return res.status(400).send();
  };

  public getReadBooksStatistics = async (req: Request, res: Response) => {
    try {
      const stats = await this.userService.getReadBooksStatistics(req.user);

      return res.status(200).json(stats);
    } catch (error) {
      return res.status(500).send();
    }
  };

  public getGoals = async (req: Request, res: Response) => {
    let { adjusted } = req.query;

    try {
      const goals = await this.userService.getGoals(
        req.user,
        adjusted === "true" ? true : false
      );

      return res.status(200).json(goals);
    } catch (error) {
      return res.status(500).send();
    }
  };

  public createGoal = async (req: Request, res: Response) => {
    const { startDate, endDate, booksNumber, goalTitle } = req.body;

    try {
      await this.userService.createGoal(
        startDate,
        endDate,
        booksNumber,
        string.sanitize(goalTitle),
        req.user
      );

      return res.status(201).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send();
    }
  };
}
