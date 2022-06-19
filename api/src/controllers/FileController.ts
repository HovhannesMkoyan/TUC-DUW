import { Request, Response } from "express";
import { IMappers, IServices } from "../../types";

export default class FileController {
  private fileMapper: any;
  private fileService: any;

  constructor({ fileMapper, fileService }: IServices & IMappers) {
    this.fileMapper = fileMapper;
    this.fileService = fileService;
  }

  public add = async (req: Request, res: Response) => {
    const { file } = req.files as any;
    const { description } = req.body;

    try {
      const fileRecord = await this.fileService.add(file, description);

      return res.status(200).json(fileRecord);
    } catch (error: any) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  };
}
