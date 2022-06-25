export interface IFile {
  uuid: string;
  name: string;
  description: string;
  size: string;
  data: boolean;
  createdAt: string;
}
export interface IRequest {
  id: number;
  uuid: string;
  action: "BLOCK" | "UNBLOCK";
  reason: string;
  status: "PENDING" | "ACCEPTED" | "DECLINED";
  FileId: number;
  createdAt: string;
}
export interface IUi {
  showOverPageLoader: boolean;
  hiddenHeader: boolean;
}
export interface IState {
  ui: IUi;
}
