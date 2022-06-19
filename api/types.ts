export enum ERequestType {
  BLOCK = "block",
  UNBLOCK = "unblock",
}

export enum ERequestStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DECLINED = "declined",
}

export interface IFile {
  id: number;
  uuid: string;
  name: string;
  description: string;
  size: string | number;
  data: string;
  hash: string;
  blocked: boolean;
  createdAt: Date;
}
export interface IControllers {
  fileController: any;
  requestController: any;
}

export interface IMappers {
  fileMapper: any;
  requestMapper: any;
  subscriptionMapper: any;
}

export interface IServices {
  fileService: any;
  requestService: any;
  downloadService: any;
}
