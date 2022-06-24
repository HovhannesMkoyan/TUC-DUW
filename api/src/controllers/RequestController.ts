import { Request, Response } from "express";
import { IMappers, IServices } from "../../types";

export default class RequestController {
  private requestMapper: any;
  private requestService: any;
  private blocklistService: any;

  constructor({
    requestMapper,
    requestService,
    blocklistService,
  }: IServices & IMappers) {
    this.requestMapper = requestMapper;
    this.requestService = requestService;
    this.blocklistService = blocklistService;
  }

  public get = async (req: Request, res: Response) => {
    try {
      const file = await this.requestService.get(req.params.uuid);

      return res.status(200).json(file);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "An error occured while processing the request",
      });
    }
  };

  public add = async (req: Request, res: Response) => {
    const { fileId, reason } = req.body;

    try {
      const requestRecord = await this.blocklistService.add(fileId, reason);

      return res.status(201).json(requestRecord);
    } catch (error: any) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  };
}
