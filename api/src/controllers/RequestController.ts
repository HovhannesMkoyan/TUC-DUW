import { Request, Response } from "express";
import { IMappers, IServices, IUser } from "../../types";

export default class RequestController {
  private requestMapper: any;
  private requestService: any;

  constructor({
    requestMapper,
    requestService,
  }: IServices & IMappers) {
    this.requestMapper = requestMapper;
    this.requestService = requestService;
  }

  public getUser = async (req: Request, res: Response) => {
    try {
      const user = await this.requestService.getUser();

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).send();
    }
  };
}
