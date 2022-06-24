import { Request, Response } from "express";
import { IMappers, IServices } from "../../types";

export default class FileController {
  private fileService: any;

  constructor({ fileService }: IServices) {
    this.fileService = fileService;
  }

  public get = async (req: Request, res: Response) => {
    try {
      const file = await this.fileService.get(req.params.uuid);
      //TODO: get file status and send it alongside the file

      return res.status(200).json(file);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "An error occured while processing the request",
      });
    }
  };

  public add = async (req: Request, res: Response) => {
    const { file } = req.files as any;
    const { description } = req.body;

    try {
      const fileRecord = await this.fileService.add(file, description);

      return res.status(201).json(fileRecord);
    } catch (error: any) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  };

  public download = async (req: Request, res: Response) => {
    try {
      const file = await this.fileService.get(req.params.uuid, false);

      //TODO: Check if blocked before downloading

      return res.status(201).json(file.data);
    } catch (error: any) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  };
}
