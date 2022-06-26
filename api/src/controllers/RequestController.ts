import { Request, Response } from "express";
import { IMappers, IServices } from "../../types";

export default class RequestController {
  private requestMapper: any;
  private requestService: any;
  private fileService: any;
  private blocklistService: any;

  constructor({
    requestMapper,
    requestService,
    fileService,
    blocklistService,
  }: IServices & IMappers) {
    this.requestMapper = requestMapper;
    this.requestService = requestService;
    this.fileService = fileService;
    this.blocklistService = blocklistService;
  }

  public getAll = async (req: Request, res: Response) => {
    try {
      const requests = await this.requestService.getAll();

      return res.status(200).json(requests);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "An error occured while processing the request",
      });
    }
  };

  public get = async (req: Request, res: Response) => {
    try {
      const file = await this.requestService.get(req.params.uuid);

      return res.status(200).json(file);
    } catch (err) {
      return res.status(500).json({
        error: "An error occured while processing the request",
      });
    }
  };

  public add = async (req: Request, res: Response) => {
    const { uuid, reason, action } = req.body;

    try {
      const file = await this.fileService.get(uuid, false);
      const requestRecord = await this.requestService.add(
        file.id,
        reason,
        action
      );

      return res.status(201).json(requestRecord);
    } catch (error: any) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  };
}
