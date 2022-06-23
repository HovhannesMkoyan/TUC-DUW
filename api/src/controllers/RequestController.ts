import { Request, Response } from "express";
import { IMappers, IServices } from "../../types";

export default class RequestController {
  private requestMapper: any;
  private requestService: any;

  constructor({ requestMapper, requestService }: IServices & IMappers) {
    this.requestMapper = requestMapper;
    this.requestService = requestService;
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
    console.log(req.body)
    return;

    // try {
    //   const requestRecord = await this.requestService.add(file_id, reason);

    //   return res.status(201).json(requestRecord);
    // } catch (error: any) {
    //   console.log(error);
    //   return res.status(500).send({ error: error.message });
    // }
  };
}
