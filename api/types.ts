export enum ERequestType {
  BLOCK = "block",
  UNBLOCK = "unblock",
}

export enum ERequestStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DECLINED = "declined",
}

export interface IUser {
  id: number;
  uuid: string;
  firstname?: string;
  lastname: string;
  email: string;
  city: string;
  country: string;
  detailed_geo_info: any;
  provider_id: string;
  downloads_left: number;
  is_subscribed: boolean;
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
