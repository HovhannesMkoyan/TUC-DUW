export enum ERequestAction {
  BLOCK = "BLOCK",
  UNBLOCK = "UNBLOCK",
}

export enum ERequestStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
}
export type RequestStatusType = "PENDING" | "ACCEPTED" | "DECLINED";
export interface IRequest {
  id: number;
  uuid: string;
  action: ERequestAction;
  reason: string;
  status: RequestStatusType;
  File: IFile;
  FileId: number;
  createdAt: Date;
}
export interface IFile {
  id: number;
  uuid: string;
  name: string;
  description: string;
  size: string | number;
  data: string;
  hash: string;
  Requests: IRequest[];
  createdAt: Date;
}
export interface IControllers {
  fileController: any;
  requestController: any;
}

export interface IMappers {
  fileMapper: any;
  requestMapper: any;
}

export interface IServices {
  fileService: any;
  requestService: any;
  blocklistService: any;
}
