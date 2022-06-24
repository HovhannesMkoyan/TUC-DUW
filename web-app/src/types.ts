export interface IFile {
  readonly uuid: string;
  name: string;
  description: string;
  size: string;
  data: boolean;
  createdAt: string;
}
export interface IUi {
  showOverPageLoader: boolean;
  hiddenHeader: boolean;
}
export interface IState {
  ui: IUi;
}
