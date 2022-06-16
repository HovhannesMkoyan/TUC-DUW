import { Request, Response } from "express";
import { IMappers, IServices } from "../../types";

export default class FileController {
  private fileMapper: any;
  private fileService: any;

  constructor({ fileMapper, fileService }: IServices & IMappers) {
    this.fileMapper = fileMapper;
    this.fileService = fileService;
  }

  public getUser = async (req: Request, res: Response) => {
    try {
      const user = await this.fileService.getUser();

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).send();
    }
  };
}
